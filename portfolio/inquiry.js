(() => {
  const picker = document.getElementById('inquiry-case');
  const subject = document.getElementById('case-subject');
  const message = document.getElementById('case-message');
  const record = document.getElementById('case-record');
  const fields = Array.from(record.querySelectorAll('dd'));
  const headings = Array.from(record.querySelectorAll('dt'), item => item.textContent);
  const download = document.getElementById('case-download');

  const examples = {
    viewing: {
      subject: subject.textContent,
      message: message.textContent,
      fields: fields.map(field => field.textContent)
    },
    rental: {
      subject: 'Availability at 4500 Pine St',
      message: '“Hello, is 4500 Pine St still available? I’m hoping to move in next month. Thanks, Alex.”',
      fields: ['Alex', '4500 Pine St', 'Rental availability', 'Move in next month', 'Check the listing status, then reply with availability.']
    }
  };

  function selectExample() {
    const sample = examples[picker.value];
    subject.textContent = sample.subject;
    message.textContent = sample.message;
    fields.forEach((field, index) => { field.textContent = sample.fields[index]; });
    record.open = false;

    const rows = [headings, sample.fields].map(row =>
      row.map(value => '"' + value.replaceAll('"', '""') + '"').join(',')
    );
    download.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(rows.join('\r\n') + '\r\n');
    download.download = picker.value + '-follow-up.csv';
  }

  picker.addEventListener('change', selectExample);
  selectExample();
  picker.closest('label').hidden = false;
})();
