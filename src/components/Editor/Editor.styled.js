import styled from "styled-components";

export const QuillEditorWrapper = styled.div`
  width: 700px;
  margin-left: auto;
  margin-right: auto;

  & #editor {
    margin-bottom: 10px;
  }

  & #editor .ql-toolbar {
    width: 700px;
    position: absolute;
    z-index: 100;
    background-color: #fff;
  }

  & #editor .ql-container {
    padding-top: 45px;
    max-height: 400px;
    overflow-y: auto;
  }

  & #editor p img {
    max-width: 250px;
    height: auto;
  }
`;
