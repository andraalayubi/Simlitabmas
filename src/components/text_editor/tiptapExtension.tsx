// import { CommandProps, Extension, RawCommands } from "@tiptap/react";
import { Extension, RawCommands, CommandProps } from "@tiptap/core";


/**
 * FontSize - Custom Extension
 * editor.commands.setFontSize(e.target.value) :set the font-size.
 */

export const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return {
      types: ["textStyle"],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) =>
              element.style.fontSize.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands(): Partial<any> {
    return {
      setFontSize:
        (fontSize : string) =>
        ({ chain } : any) => {
          return chain()
            .setMark("textStyle", { fontSize: fontSize + "px" })
            .run();
        },
      unsetFontSize:
        () =>
        ({ chain } : any) => {
          return chain()
            .setMark("textStyle", { fontSize: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});
