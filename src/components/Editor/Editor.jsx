import { useRef, useState } from "react";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
import { QuillEditorWrapper } from "./Editor.styled";

const Editor = ({ initialValue, handleSave }) => {
  const [value, setValue] = useState(initialValue.data);
  const quill = useRef();

  const modules = {
    toolbar: {
      container: [
        [{ header: [2, 3, 4, false] }],
        ["bold", "italic", "underline", "blockquote"],
        [{ color: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
    },
    clipboard: {
      matchVisual: true,
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];

  return (
    <QuillEditorWrapper>
      <QuillEditor
        ref={(el) => (quill.current = el)}
        id="editor"
        theme="snow"
        value={value}
        formats={formats}
        modules={modules}
        onChange={(value) => setValue(value)}
      />
      <button onClick={() => handleSave(value)} className="action-btn">
        Save
      </button>
    </QuillEditorWrapper>
  );
};

export default Editor;
