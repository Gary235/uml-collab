import { FC } from "react";
import { Editor, Monaco } from "@monaco-editor/react";
import defineTheme from "../utils/defineTheme";
import defineLanguages from "../utils/defineLanguages";
import getOptions from "../utils/getOptions";

interface IProps {
  onChange: (val: string) => void;
  value: string;
  language: string;
}

const DocEditor: FC<IProps> = ({onChange, value, language}) => {
  // const editorRef = useRef(null);

  function handleEditorWillMount(monaco: Monaco) {
    // editorRef.current = monaco.editor;
    defineTheme(monaco);
    defineLanguages(monaco);
  }

  return (
    <Editor
      height="60vh"
      width="100%"
      defaultLanguage={language}
      defaultValue={language}
      path={`${language}.txt`}
      beforeMount={handleEditorWillMount}
      theme='transparent'
      loading=''
      options={getOptions()}
      value={value}
      onChange={(val) => {onChange(val ?? '')}}
    />
  )

}

export default DocEditor;
