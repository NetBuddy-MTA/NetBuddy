// @ts-nocheck
import {useState} from "react";
import Collapsible from 'react-collapsible';
interface Sequences {
  [key: string]: string;
}

const sequences: Sequences =  [
  {
    DisplayName : "Create New Tab",
    ActionString : "CreateTab",
    Description : "Creates a new tab in the browser",
    Category : "Browser",
    Inputs : [
      {
        Name : "Url",
        Description : "The URL of the page to open (Optional)",
        Type : "URL",
        Optional : true
      }
    ],
    Outputs : [
      {
        Name : "Tab",
        Description : "The tab that was created",
        Type : "Tab"
      }
    ]
  },
  {
    DisplayName : "Navigate to URL",
    ActionString : "NavigateToURL",
    Description : "Navigates to a URL in the provided tab",
    Category : "Browser",
    Inputs : [
      {
        Name : "Tab",
        Description : "The tab to navigate in",
        Type : "Tab"
      },
      {
        Name : "Url",
        Description : "The URL to navigate to",
        Type : "URL"
      }
    ],
    Outputs : [
      {
        Name : "Tab",
        Description : "The tab that was navigated",
        Type : "Tab"
      }
    ]
  },
  {
    DisplayName : "Find Elements by Selector",
    ActionString : "FindElementsBySelector",
    Description : "Finds all elements matching the given selector in the tab",
    Category : "Extraction",
    Inputs : [
      {
        Name : "Selector",
        Description : "The selector that the elements will be matched against",
        Type : "Selector"
      },
      {
        Name : "Tab",
        Description : "The tab to be searched",
        Type : "Tab"
      }
    ],
    Outputs : [
      {
        Name : "Elements",
        Description : "The elements in the tab that match the selector",
        Type : "Element[]"
      },
      {
        Name : "Count",
        Description : "The number of elements that match the selector",
        Type : "Number"
      }
    ]
  },
];
function groupByCategory(items) {
  // Use reduce to group the items by category
  const grouped = items.reduce((acc, item) => {
    // If the category hasn't been seen before, initialize it with an empty array
    if (!acc[item.Category]) {
      acc[item.Category] = [];
    }

    // Push the current item into the array for its category
    acc[item.Category].push(item);
    return acc;
  }, {});

  // Convert the grouped object into an array of arrays
  return Object.values(grouped);
}
const grouped = groupByCategory(sequences);
const SequenceScreen = () => {
  const [selected, setSelected] = useState([]);
  
  return (
    <div>
      <h1>Select a Sequence</h1>
      {grouped.map(category=> (
        /* @ts-ignore */
        <Collapsible trigger={category[0].Category} key={category[0].Category}>
          {category.map(({DisplayName}) => (<button onClick={() => setSelected((prev)=>[...prev,DisplayName])} key={DisplayName}> {DisplayName} </button>))}
        </Collapsible>
      ))}
      <ul>
        {selected.map((action,i) => <li key={`${action}-${i}`}>{action}</li>)}
      </ul>
    </div>
  );
};

export default SequenceScreen;
