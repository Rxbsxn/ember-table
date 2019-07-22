import Controller from '@ember/controller';
import { computed } from '@ember-decorators/object';

export default class SimpleController extends Controller {
  // BEGIN-SNIPPET docs-example-row-selection.js
  @computed
  get columns() {
    return [
      { name: 'A', valuePath: 'A', width: 180 },
      { name: 'B', valuePath: 'B', width: 180 },
      { name: 'C', valuePath: 'C', width: 180 },
      { name: 'D', valuePath: 'D', width: 180 },
    ];
  }

  @computed
  get rows() {
    return [
      { A: 'A', B: 'B', C: 'C', D: 'D' },
      { A: 'A', B: 'B', C: 'C', D: 'D' },
      { A: 'A', B: 'B', C: 'C', D: 'D' },
      { A: 'A', B: 'B', C: 'C', D: 'D' },
      { A: 'A', B: 'B', C: 'C', D: 'D' },
      { A: 'A', B: 'B', C: 'C', D: 'D' },
      { A: 'A', B: 'B', C: 'C', D: 'D' },
      { A: 'A', B: 'B', C: 'C', D: 'D' },
      { A: 'A', B: 'B', C: 'C', D: 'D' },
      { A: 'A', B: 'B', C: 'C', D: 'D' },
      { A: 'A', B: 'B', C: 'C', D: 'D' },
    ];
  }
  // END-SNIPPET

  // BEGIN-SNIPPET docs-example-selected-rows.js
  constructor() {
    super(...arguments);

    let [rowWithChildren] = this.get('rowWithChildren');

    this.preselection = [rowWithChildren];
  }

  @computed
  get rowWithChildren() {
    return [
      {
        A: 'A',
        B: 'B',
        C: 'C',
        D: 'D',

        children: [
          { A: 'A', B: 'B', C: 'C', D: 'D' },
          { A: 'A', B: 'B', C: 'C', D: 'D' },
          { A: 'A', B: 'B', C: 'C', D: 'D' },
          { A: 'A', B: 'B', C: 'C', D: 'D' },
          { A: 'A', B: 'B', C: 'C', D: 'D' },
          { A: 'A', B: 'B', C: 'C', D: 'D' },
          { A: 'A', B: 'B', C: 'C', D: 'D' },
          { A: 'A', B: 'B', C: 'C', D: 'D' },
          { A: 'A', B: 'B', C: 'C', D: 'D' },
          { A: 'A', B: 'B', C: 'C', D: 'D' },
          { A: 'A', B: 'B', C: 'C', D: 'D' },
          { A: 'A', B: 'B', C: 'C', D: 'D' },
        ],
      },
    ];
  }
  // END-SNIPPET

  // BEGIN-SNIPPET docs-example-selection-modes.js
  rowSelectionMode = 'multiple';
  checkboxSelectionMode = 'multiple';
  selectingChildrenSelectsParent = true;

  @computed
  get rowsWithChildren() {
    let makeRow = (id, { children } = { children: [] }) => {
      return {
        A: `A${id}`,
        B: 'B',
        C: 'C',
        D: 'D',
        children,
      };
    };
    return [
      makeRow(1, {
        children: [
          makeRow(2, {
            children: [makeRow(3), makeRow(4), makeRow(5)],
          }),
          makeRow(6),
          makeRow(7),
          makeRow(8, {
            children: [makeRow(9), makeRow(10), makeRow(11)],
          }),
        ],
      }),
    ];
  }

  @computed('selection')
  get currentSelection() {
    if (!this.selection || this.selection.length === 0) {
      return 'Nothing selected';
    } else {
      if (Array.isArray(this.selection)) {
        return `Array: [${this.selection.map(row => row.A).join(',')}]`;
      } else {
        let row = this.selection;
        return `Single: ${row.A}`;
      }
    }
  }
  // END-SNIPPET
}