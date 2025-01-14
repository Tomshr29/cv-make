import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useForm } from "@inertiajs/react";
import type { FormEvent } from "react";

function AddResume() {
  const { post, processing, data, setData } = useForm({
    title: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();

    if (processing) {
      return;
    }

    post("/addResume"),
      {
        onFinish() {
          setData("title", "");
          setIsOpen(false);
        },
      };
  }

  return (
    <div>
      <div
        onClick={() => setIsOpen(true)}
        className="flex h-[280px] cursor-pointer items-center justify-center rounded-lg border border-dashed bg-gray-50 p-14 py-24 transition-all hover:scale-105 hover:shadow-md"
      >
        <Plus />
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <form onSubmit={submit}>
            <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
              <DialogTitle className="font-bold">Create New Resume</DialogTitle>
              <Description>
                <p>Add a title for your new resume</p>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={data.title}
                  onChange={(e) => setData("title", e.target.value)}
                />
              </Description>
              <div className="flex justify-end gap-5">
                <button onClick={() => setIsOpen(false)}>Cancel</button>
                <button type="submit" disabled={processing}>
                  Create
                </button>
              </div>
            </DialogPanel>
          </form>
        </div>
      </Dialog>
    </div>
  );
}

export default AddResume;
