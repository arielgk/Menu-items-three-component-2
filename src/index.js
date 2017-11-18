import React from 'react';
import { render } from 'react-dom';
import Three from './Three';

const items = [
  {
    id: 1,
    name: 'ITEM 1',
    link: 'link',
    page_id: "id",
    site_id: 1,
    order: 99,
    parent: null
  }, {
    id: 2,
    name: 'ITEM 2',
    link: 'link',
    page_id: "id",
    site_id: 1,
    order: 99,
    parent: null

  }, {
    id: 3,
    name: 'ITEM 3',
    link: 'link',
    page_id: "id",
    site_id: 1,
    order: 99,
    parent: 2

  }
  , {
    id: 4,
    name: 'ITEM 4',
    link: 'link',
    page_id: 'bla',
    site_id: 1,
    order: 99,
    parent: 3

  },
];



const App = () => (
  <div >
   <Three items={items}/>
  </div>
);




render(<App />, document.getElementById('root'));
