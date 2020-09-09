export interface ReplyInputField {
  name: string;
  value: string;
  type: string;
}

const toObj = (el: HTMLInputElement): ReplyInputField => ({
  name: el.name,
  value: el.value,
  type: el.type,
});

const filterFields = (
  visibleFields: ReplyInputField[],
  hiddenFields: ReplyInputField[],
  blacklist: string[],
) => {
  let keys: string[] = [];

  return visibleFields
    .concat(hiddenFields)
    .reduce<ReplyInputField[]>((fields, field) => {
      if (keys.includes(field.name) || blacklist.includes(field.name))
        return fields;

      keys.push(field.name);
      fields.push(field);

      return fields;
    }, []);
};

export const replyScraper = (document: Document) => {
  const formEl = document.querySelector<HTMLFormElement>(
    '#maintable form[name="postform"]',
  );
  const hiddenFieldsEls = document.querySelectorAll<HTMLInputElement>(
    'input[type="hidden"]',
  );
  const visibleFieldsEls = document.querySelectorAll<HTMLInputElement>(
    'input:not([type="hidden"])',
  );

  const visibleWhitelist = [
    'subject',
    'addbbcode20',
    'message',
    'attach_sig',
    'post',
    'fileupload',
    'filecomment',
  ];

  const blacklist = ['subject'];

  const hiddenFields = Array.from(hiddenFieldsEls).map(toObj);
  const visibleFields = Array.from(visibleFieldsEls)
    .filter((el) => visibleWhitelist.includes(el.name))
    .map(toObj);
  const filteredFields = filterFields(visibleFields, hiddenFields, blacklist);

  // add missing
  filteredFields.push({ name: 'addbbcode20', value: '100', type: 'hidden' });
  filteredFields.push({ name: 'filecomment', value: '', type: 'hidden' });
  filteredFields.push({ name: 'post', value: 'Submit', type: 'hidden' });

  const subject = formEl!.querySelector<HTMLInputElement>(
    'input[name="subject"]',
  )!.value;
  const message = formEl!.querySelector<HTMLInputElement>(
    'textarea.posting-textarea',
  )!.value;
  const action = formEl!.action;

  return {
    hiddenFields,
    visibleFields,
    filteredFields,
    subject,
    message,
    action,
  };
};
