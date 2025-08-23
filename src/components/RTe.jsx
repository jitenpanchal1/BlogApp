import React from 'react';
import { Controller } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';

function RTe({ name = 'content', control, label, defaultValue = '' }) {
  return (
    <div className="rte-wrapper space-y-2">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey="13bsnrl8z1zvs5s2x1tafekiaacd3ge12gjpqme36409dkyv"
            value={value}
            onEditorChange={onChange}
            init={{
              height: 400,
              menubar: false,
              plugins: [
                'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable',
                'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography',
                'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf',
              ],
              toolbar:
                'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | ' +
                'addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | ' +
                'emoticons charmap | removeformat',
              tinycomments_mode: 'embedded',
              tinycomments_author: 'Author name',
              mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' },
              ],
              ai_request: (request, respondWith) =>
                respondWith.string(() =>
                  Promise.reject('See docs to implement AI Assistant')
                ),
            }}
          />
        )}
      />
    </div>
  );
}

export default RTe;
