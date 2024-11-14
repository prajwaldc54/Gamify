import { Tab, Tabs } from '@chakra-ui/react';
import MDEditor, { commands } from '@uiw/react-md-editor';
import useDidMountEffect from 'hooks/useDidMountEffect';
import React from 'react';
import 'assets/css/App.css';

type CustomMarkdownEditiorProps = {
  value: string;
  setValue: (val: string) => void;
  image: string;
  setImage: (val: string) => void;
};

const CustomMarkdownEditior = (props: CustomMarkdownEditiorProps) => {
  const { value, setValue, image, setImage } = props;
  const editorRef = React.useRef<any>(null);

  useDidMountEffect(() => {
    if (image) {
      let pos = editorRef?.current?.textarea?.selectionStart;
      let SetImage = `\n![photo](https://api.gamify.dev.diagonal.solutions/${image})\n`;
      let myString =
        value?.substring(0, pos) +
        SetImage +
        value?.substring(pos, value?.length);
      setValue(myString);
      setImage('');
    }
  }, [image]);

  return (
    <MDEditor
      value={value}
      ref={editorRef}
      onChange={(value) => setValue(value!)}
      preview="edit"
      commands={[
        { ...commands.codeEdit, icon: <Tabs>Write</Tabs> },
        { ...commands.codePreview, icon: <Tabs>Preview</Tabs> },
      ]}
      extraCommands={[
        commands.bold,
        commands.italic,
        commands.code,
        commands.quote,
        commands.link,
        commands.unorderedListCommand,
        commands.orderedListCommand,
        commands.checkedListCommand,
      ]}
      style={{ boxShadow: 'none' }}
    />
  );
};

export default CustomMarkdownEditior;
