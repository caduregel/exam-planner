import { IExamInfo } from "@/interfaces/IExamInfo"
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { useState } from "react"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { handleExamUpdate } from "@/util/api/Put/PutExam"

const presetColors = [
  { name: "Red", color: "#ef4444" },
  { name: "Orange", color: "#f59e42" },
  { name: "Yellow", color: "#eab308" },
  { name: "Green", color: "#22c55e" },
  { name: "Blue", color: "#3b82f6" },
  { name: "Purple", color: "#a855f7" },
  { name: "Pink", color: "#ec4899" },
]

function EditExamDialogContent({ exam, closeDialog }: { exam: IExamInfo, closeDialog: () => void }) {
  const [title, setTitle] = useState<string>(exam.title)
  const [color, setColor] = useState<string>(exam.exam_color || "#ef4444")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      await handleExamUpdate(Number(exam.id), { ...exam, title, exam_color: color })
      closeDialog()
    } catch (e) {
      setError("Failed to update exam.")
      console.error(e)
    }
    setLoading(false)
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Exam</DialogTitle>
        <DialogDescription>Change the exam's title or color</DialogDescription>
      </DialogHeader>
      <Separator className="my-2" />

      <div className="py-2 flex flex-col gap-4">
        <div>
          <Label htmlFor="exam-title" className="block mb-1">Exam Title</Label>
          <Input
            id="exam-title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full"
            placeholder="Exam title"
          />
        </div>
        <div>
          <Label className="mb-1">Exam Color</Label>
          <div className="flex flex-wrap gap-2 mt-1">
            {presetColors.map((preset) => (
              <button
                key={preset.color}
                type="button"
                className={`w-8 h-8 rounded-full border-2 border-muted-foreground/20 flex items-center justify-center transition hover:cursor-pointer
                  ${color === preset.color ? "ring-2 ring-offset-2 ring-primary" : ""}
                `}
                style={{ backgroundColor: preset.color }}
                aria-label={preset.name}
                onClick={() => setColor(preset.color)}
              />
            ))}
          </div>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </div>

      <DialogFooter>
        <Button variant="secondary" disabled={loading} onClick={closeDialog}>Cancel</Button>
        <Button variant="default" disabled={loading} onClick={handleSubmit}>
          Save
        </Button>
      </DialogFooter>
    </>
  )
}

export default EditExamDialogContent