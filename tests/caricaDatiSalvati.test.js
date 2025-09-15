const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('caricaDatiSalvati', () => {
  let dom;

  beforeEach(() => {
    const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
  });

  test('popola la tabella con una riga per ciascun elemento nel localStorage', () => {
    const fakeData = [
      { azienda: 'A', tipologia: 't1', sede_operativa: 's', attrezzature: [], misurazioni: [] },
      { azienda: 'B', tipologia: 't2', sede_operativa: 's', attrezzature: [], misurazioni: [] }
    ];
    dom.window.localStorage.setItem('checklistAcustica', JSON.stringify(fakeData));
    dom.window.caricaDatiSalvati();

    const rows = dom.window.document.querySelectorAll('#datiSalvatiBody tr');
    expect(rows.length).toBe(fakeData.length);
  });
});
