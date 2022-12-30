import React from 'react';

interface actionBoxTabs {
  selectedTab: number;
  changeSelectedTab: (tabNum: number) => void;
  showHistory: boolean;
}
interface tab {
  value: string;
  tabNum: number;
  selectedTab: number;
  changeSelectedTab: (tabNum: number) => void;
}
const selected = '#404040';
const unselected = 'black';

function Tab(props: tab) {
  const {
    value,
    tabNum,
    selectedTab,
    changeSelectedTab,
  } = props;

  return (
    <button
      type="button"
      onClick={() => changeSelectedTab(tabNum)}
      style={{
        fontFamily: 'Electrolize',
        background: selectedTab === tabNum ? selected : unselected,
        color: 'white',
        borderStyle: 'solid',
        borderColor: 'dimgray',
        borderBottom: 'none',
        textAlign: 'center',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        cursor: 'pointer',
      }}
    >
      {value}
    </button>
  );
}

export default function ActionBoxTabs(props: actionBoxTabs) {
  const {
    selectedTab,
    changeSelectedTab,
    showHistory,
  } = props;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      color: 'silver',
      borderBottomStyle: 'solid',
      borderColor: 'dimgray',
      padding: 'none',
      minWidth: '200px',
    }}
    >
      <div />
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '5px',
      }}
      >
        <Tab
          value="Enter / Leave"
          selectedTab={selectedTab}
          changeSelectedTab={changeSelectedTab}
          tabNum={0}
        />
        {showHistory && (
          <Tab
            value="History"
            selectedTab={selectedTab}
            changeSelectedTab={changeSelectedTab}
            tabNum={1}
          />
        )}
      </div>
    </div>
  );
}
