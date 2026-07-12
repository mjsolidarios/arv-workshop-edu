import { useCallback, useEffect, useRef, useState } from "react"
import {
  Camera,
  CircleStop,
  Hand,
  ImagePlus,
  LoaderCircle,
  Play,
  RotateCcw,
  ScanSearch,
  Sparkles,
  Upload,
} from "lucide-react"
import type {
  HandLandmarker,
  NormalizedLandmark,
} from "@mediapipe/tasks-vision"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type DemoStatus = "idle" | "loading" | "ready" | "running" | "error"

type EncantarTracker = {
  database: {
    add: (images: Array<{ name: string; image: HTMLImageElement }>) => Promise<void>
    count: number
  }
  addEventListener: (
    type: "targetfound" | "targetlost",
    listener: (event: { referenceImage: { name: string } }) => void
  ) => void
}

type EncantarSession = {
  ended: boolean
  requestAnimationFrame: (
    callback: (time: number, frame: unknown) => void
  ) => unknown
  end: () => Promise<void>
}

type EncantarModule = {
  isSupported: () => boolean
  Tracker: { Image: (options?: { resolution?: string }) => EncantarTracker }
  Viewport: (options: { container: HTMLElement }) => unknown
  Source: { Camera: () => unknown }
  startSession: (options: {
    mode: "inline" | "immersive"
    viewport: unknown
    trackers: EncantarTracker[]
    sources: unknown[]
    gizmos?: boolean
    stats?: boolean
  }) => Promise<EncantarSession>
}

type UploadedImage = {
  id: string
  name: string
  url: string
  width: number
  height: number
}

function cameraErrorMessage(error: unknown) {
  if (error instanceof DOMException) {
    if (error.name === "NotAllowedError") {
      return "Camera access was blocked. Allow camera permission in your browser settings, then try again."
    }
    if (error.name === "NotFoundError") {
      return "No camera was found on this device. Connect a camera or try another device."
    }
    if (error.name === "NotReadableError") {
      return "The camera is busy in another app. Close the other app, then try again."
    }
  }
  return error instanceof Error ? error.message : "The camera could not be started."
}

async function loadImage(url: string) {
  return await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error("One of the selected images could not be read."))
    image.src = url
  })
}

async function loadEncantar() {
  // The vendored free edition is JavaScript-only and does not ship TypeScript declarations.
  // @ts-expect-error Encantar is loaded lazily so the AR engine stays out of the initial bundle.
  return (await import("../../vendor/encantar.module.min.js")) as EncantarModule
}

export function ImageTrackingDemo() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackerRef = useRef<EncantarTracker | null>(null)
  const sessionRef = useRef<EncantarSession | null>(null)
  const imagesRef = useRef<UploadedImage[]>([])
  const [images, setImages] = useState<UploadedImage[]>([])
  const [status, setStatus] = useState<DemoStatus>("idle")
  const [message, setMessage] = useState("Upload one to three detailed images to begin.")
  const [foundTarget, setFoundTarget] = useState<string | null>(null)

  const replaceImages = (next: UploadedImage[]) => {
    imagesRef.current.forEach((image) => URL.revokeObjectURL(image.url))
    imagesRef.current = next
    setImages(next)
  }

  const stopSession = useCallback(async () => {
    const session = sessionRef.current
    sessionRef.current = null
    if (session && !session.ended) await session.end().catch(() => undefined)
    if (viewportRef.current) viewportRef.current.replaceChildren()
    setFoundTarget(null)
    if (trackerRef.current) {
      const count = trackerRef.current.database.count
      setStatus("ready")
      setMessage(
        count +
          " tracking image" +
          (count === 1 ? " is" : "s are") +
          " ready to test."
      )
    }
  }, [])

  useEffect(() => {
    return () => {
      const session = sessionRef.current
      if (session && !session.ended) void session.end()
      imagesRef.current.forEach((image) => URL.revokeObjectURL(image.url))
    }
  }, [])

  const chooseImages = async (files: FileList | null) => {
    if (!files?.length) return
    await stopSession()
    trackerRef.current = null
    const selected = Array.from(files).slice(0, 3)
    const next = await Promise.all(
      selected.map(async (file, index) => {
        const url = URL.createObjectURL(file)
        const image = await loadImage(url)
        return {
          id: file.name + "-" + file.lastModified + "-" + index,
          name: file.name.replace(/\.[^.]+$/, "") || "target-" + (index + 1),
          url,
          width: image.naturalWidth,
          height: image.naturalHeight,
        }
      })
    )
    replaceImages(next)
    setStatus("idle")
    setMessage(
      next.length +
        " image" +
        (next.length === 1 ? "" : "s") +
        " selected. Register them before testing."
    )
  }

  const registerImages = async () => {
    if (!images.length) return
    setStatus("loading")
    setMessage("Loading Encantar.js and registering image features…")
    setFoundTarget(null)
    try {
      const AR = await loadEncantar()
      if (!AR.isSupported()) {
        throw new Error(
          "This browser does not provide the WebGL2 features required for image tracking."
        )
      }
      const loadedImages = await Promise.all(images.map((item) => loadImage(item.url)))
      const tracker = AR.Tracker.Image({ resolution: "sm" })
      await tracker.database.add(
        loadedImages.map((image, index) => ({
          name: images[index].name,
          image,
        }))
      )
      tracker.addEventListener("targetfound", (event) => {
        setFoundTarget(event.referenceImage.name)
        setMessage("Target found: " + event.referenceImage.name)
      })
      tracker.addEventListener("targetlost", () => {
        setFoundTarget(null)
        setMessage("Target lost. Hold an uploaded image steady inside the frame.")
      })
      trackerRef.current = tracker
      setStatus("ready")
      setMessage(
        tracker.database.count +
          " tracking image" +
          (tracker.database.count === 1 ? " is" : "s are") +
          " ready. Start the camera to test."
      )
    } catch (error) {
      setStatus("error")
      setMessage(cameraErrorMessage(error))
    }
  }

  const startTesting = async () => {
    if (!trackerRef.current || !viewportRef.current) return
    setStatus("loading")
    setMessage("Starting the camera and image tracker…")
    try {
      const AR = await loadEncantar()
      const viewport = AR.Viewport({ container: viewportRef.current })
      const session = await AR.startSession({
        mode: "inline",
        viewport,
        trackers: [trackerRef.current],
        sources: [AR.Source.Camera()],
        gizmos: true,
        stats: false,
      })
      sessionRef.current = session
      const animate = () => {
        if (!session.ended) session.requestAnimationFrame(animate)
      }
      session.requestAnimationFrame(animate)
      setStatus("running")
      setMessage("Camera is scanning. Show one of your uploaded images to the camera.")
    } catch (error) {
      setStatus("error")
      setMessage(cameraErrorMessage(error))
    }
  }

  const reset = async () => {
    await stopSession()
    replaceImages([])
    trackerRef.current = null
    setStatus("idle")
    setMessage("Upload one to three detailed images to begin.")
  }

  const statusClass =
    status === "error"
      ? "border-destructive/40 bg-destructive/5 text-destructive"
      : "bg-muted/30 text-muted-foreground"

  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="secondary" className="gap-1.5">
            <ScanSearch className="h-3.5 w-3.5" />
            Working AR example
          </Badge>
          <Badge variant="outline">Encantar.js</Badge>
        </div>
        <CardTitle className="text-xl">Train and test your tracking images</CardTitle>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Upload detailed reference images, register them in the tracker, then point your
          camera at the original image or a copy displayed on another screen.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center transition-colors hover:bg-muted/50">
              <Upload className="mb-2 h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Upload tracking images</span>
              <span className="mt-1 text-xs text-muted-foreground">
                JPG, PNG, or WebP · up to 3 images
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="sr-only"
                onChange={(event) => void chooseImages(event.target.files)}
              />
            </label>

            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {images.map((image) => (
                  <div key={image.id} className="min-w-0 rounded-md border bg-muted/30 p-1.5">
                    <img
                      src={image.url}
                      alt={"Tracking target " + image.name}
                      className="aspect-square w-full rounded object-cover"
                    />
                    <p className="mt-1 truncate text-[10px] font-medium">{image.name}</p>
                    <p className="text-[9px] text-muted-foreground">
                      {image.width}×{image.height}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                onClick={() => void registerImages()}
                disabled={!images.length || status === "loading" || status === "running"}
              >
                {status === "loading" ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <ImagePlus className="h-4 w-4" />
                )}
                Register images
              </Button>
              {status === "ready" && (
                <Button type="button" size="sm" variant="outline" onClick={() => void startTesting()}>
                  <Camera className="h-4 w-4" />
                  Start camera test
                </Button>
              )}
              {status === "running" && (
                <Button type="button" size="sm" variant="outline" onClick={() => void stopSession()}>
                  <CircleStop className="h-4 w-4" />
                  Stop camera
                </Button>
              )}
              {images.length > 0 && (
                <Button type="button" size="sm" variant="ghost" onClick={() => void reset()}>
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              )}
            </div>
          </div>

          <div className="relative min-h-72 overflow-hidden rounded-lg border bg-black">
            <div ref={viewportRef} className="absolute inset-0 [&_canvas]:h-full [&_canvas]:w-full" />
            {status !== "running" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white/75">
                <ScanSearch className="mb-3 h-10 w-10" />
                <p className="text-sm font-medium text-white">Camera test area</p>
                <p className="mt-1 max-w-xs text-xs">
                  Register an image first. Camera frames stay on this device.
                </p>
              </div>
            )}
            {status === "running" && (
              <div className="pointer-events-none absolute inset-5 rounded-lg border-2 border-dashed border-white/70" />
            )}
            {foundTarget && (
              <div className="absolute inset-x-4 bottom-4 rounded-lg bg-emerald-500 p-3 text-center text-sm font-semibold text-emerald-950 shadow-lg">
                <Sparkles className="mr-1 inline h-4 w-4" /> Target found: {foundTarget}
              </div>
            )}
          </div>
        </div>

        <div role="status" className={"rounded-md border px-3 py-2 text-xs leading-relaxed " + statusClass}>
          {message}
        </div>
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          “Register” loads image features into the browser&apos;s runtime tracker; it does not
          upload images or train a cloud model. Use detailed, asymmetrical images and good
          lighting. Encantar.js Free Edition is provided under GPL-3.0-or-later.{" "}
          <a
            href="https://github.com/alemart/encantar-js"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            Source and license
          </a>
        </p>
      </CardContent>
    </Card>
  )
}

const targetPositions = [
  { x: 24, y: 30 },
  { x: 72, y: 25 },
  { x: 52, y: 68 },
  { x: 18, y: 76 },
  { x: 80, y: 70 },
]

export function HandTrackingDemo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const landmarkerRef = useRef<HandLandmarker | null>(null)
  const mediaPipeRef = useRef<typeof import("@mediapipe/tasks-vision") | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animationRef = useRef<number | null>(null)
  const targetIndexRef = useRef(0)
  const lastHitRef = useRef(0)
  const [status, setStatus] = useState<DemoStatus>("idle")
  const [message, setMessage] = useState(
    "Start the camera, then move your index fingertip onto the target."
  )
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null)
  const [targetIndex, setTargetIndex] = useState(0)
  const [score, setScore] = useState(0)

  const stop = useCallback(() => {
    if (animationRef.current !== null) cancelAnimationFrame(animationRef.current)
    animationRef.current = null
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    landmarkerRef.current?.close()
    landmarkerRef.current = null
    if (videoRef.current) videoRef.current.srcObject = null
    const context = canvasRef.current?.getContext("2d")
    if (context && canvasRef.current) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
    setCursor(null)
    setStatus("idle")
    setMessage("Camera stopped. Start it again whenever you are ready.")
  }, [])

  useEffect(() => stop, [stop])

  const checkTarget = (landmark: NormalizedLandmark) => {
    const x = (1 - landmark.x) * 100
    const y = landmark.y * 100
    setCursor({ x, y })
    const target = targetPositions[targetIndexRef.current]
    const distance = Math.hypot(x - target.x, y - target.y)
    const now = performance.now()
    if (distance < 10 && now - lastHitRef.current > 800) {
      lastHitRef.current = now
      setScore((value) => value + 1)
      const next = (targetIndexRef.current + 1) % targetPositions.length
      targetIndexRef.current = next
      setTargetIndex(next)
      setMessage("Target collected! Move your fingertip to the next one.")
    }
  }

  const renderFrame = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    const landmarker = landmarkerRef.current
    if (!video || !canvas || !landmarker || video.readyState < 2) {
      animationRef.current = requestAnimationFrame(renderFrame)
      return
    }
    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
    }
    const context = canvas.getContext("2d")
    if (!context) return
    context.clearRect(0, 0, canvas.width, canvas.height)
    const results = landmarker.detectForVideo(video, performance.now())
    if (results.landmarks.length > 0) {
      const mediaPipe = mediaPipeRef.current
      if (!mediaPipe) return
      const drawing = new mediaPipe.DrawingUtils(context)
      for (const landmarks of results.landmarks) {
        drawing.drawConnectors(landmarks, mediaPipe.HandLandmarker.HAND_CONNECTIONS, {
          color: "#5eead4",
          lineWidth: 3,
        })
        drawing.drawLandmarks(landmarks, { color: "#f8fafc", radius: 2 })
      }
      checkTarget(results.landmarks[0][8])
    } else {
      setCursor(null)
    }
    animationRef.current = requestAnimationFrame(renderFrame)
  }

  const start = async () => {
    setStatus("loading")
    setMessage("Loading the MediaPipe model…")
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Camera access is unavailable. Open this page over HTTPS or on localhost.")
      }
      const mediaPipe = await import("@mediapipe/tasks-vision")
      mediaPipeRef.current = mediaPipe
      const vision = await mediaPipe.FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm"
      )
      const landmarker = await mediaPipe.HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numHands: 1,
        minHandDetectionConfidence: 0.55,
        minHandPresenceConfidence: 0.55,
        minTrackingConfidence: 0.5,
      })
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: "user",
          width: { ideal: 960 },
          height: { ideal: 720 },
        },
      })
      landmarkerRef.current = landmarker
      streamRef.current = stream
      if (!videoRef.current) throw new Error("The camera preview is unavailable.")
      videoRef.current.srcObject = stream
      await videoRef.current.play()
      setStatus("running")
      setMessage("Hand tracking is active. Touch the glowing target with your index fingertip.")
      animationRef.current = requestAnimationFrame(renderFrame)
    } catch (error) {
      landmarkerRef.current?.close()
      streamRef.current?.getTracks().forEach((track) => track.stop())
      landmarkerRef.current = null
      streamRef.current = null
      setStatus("error")
      setMessage(cameraErrorMessage(error))
    }
  }

  const resetScore = () => {
    setScore(0)
    targetIndexRef.current = 0
    setTargetIndex(0)
    setMessage(
      status === "running"
        ? "Score reset. Collect the first target."
        : "Score reset. Start the camera when ready."
    )
  }

  const target = targetPositions[targetIndex]
  const statusClass =
    status === "error"
      ? "border-destructive/40 bg-destructive/5 text-destructive"
      : "bg-muted/30 text-muted-foreground"

  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="secondary" className="gap-1.5">
            <Hand className="h-3.5 w-3.5" />
            Working vision example
          </Badge>
          <Badge variant="outline">MediaPipe</Badge>
        </div>
        <CardTitle className="text-xl">Index-finger target challenge</CardTitle>
        <p className="text-sm leading-relaxed text-muted-foreground">
          MediaPipe tracks 21 hand landmarks. Move your index fingertip onto each target
          to score—no clicking required.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative aspect-[4/3] min-h-72 overflow-hidden rounded-lg border bg-slate-950">
          <video
            ref={videoRef}
            muted
            playsInline
            className="absolute inset-0 h-full w-full scale-x-[-1] object-cover"
          />
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 h-full w-full scale-x-[-1]"
          />
          {status !== "running" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white/75">
              {status === "loading" ? (
                <LoaderCircle className="mb-3 h-10 w-10 animate-spin" />
              ) : (
                <Hand className="mb-3 h-10 w-10" />
              )}
              <p className="text-sm font-medium text-white">
                {status === "loading" ? "Loading hand tracking" : "Camera preview"}
              </p>
              <p className="mt-1 max-w-xs text-xs">
                Video is processed locally and is not saved.
              </p>
            </div>
          )}
          {status === "running" && (
            <>
              <div
                className="pointer-events-none absolute h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-amber-300 bg-amber-300/25 shadow-[0_0_28px_rgba(252,211,77,0.8)]"
                style={{ left: target.x + "%", top: target.y + "%" }}
              />
              {cursor && (
                <div
                  className="pointer-events-none absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-teal-400 shadow-lg"
                  style={{ left: cursor.x + "%", top: cursor.y + "%" }}
                />
              )}
              <div className="absolute left-3 top-3 rounded-full bg-black/65 px-3 py-1 text-sm font-semibold text-white backdrop-blur">
                Score: {score}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {status !== "running" && (
            <Button type="button" size="sm" onClick={() => void start()} disabled={status === "loading"}>
              {status === "loading" ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              Start hand tracking
            </Button>
          )}
          {status === "running" && (
            <Button type="button" size="sm" variant="outline" onClick={stop}>
              <CircleStop className="h-4 w-4" />
              Stop camera
            </Button>
          )}
          <Button type="button" size="sm" variant="ghost" onClick={resetScore}>
            <RotateCcw className="h-4 w-4" />
            Reset score
          </Button>
        </div>
        <div role="status" className={"rounded-md border px-3 py-2 text-xs leading-relaxed " + statusClass}>
          {message}
        </div>
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          The first model download requires internet access. For best results, keep one
          hand in frame, face your palm toward the camera, and use even lighting.
        </p>
      </CardContent>
    </Card>
  )
}
