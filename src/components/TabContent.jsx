import React from "react";
import Summary from "./Summary";
import Contacts from "./Contacts";
import Notes from "./Notes";
import Activities from "./Activities";
import Email from "./Email";
import Files from "./Files";
import History from "./History";

const TabContent = ({ activeTab, data, tabs, setData }) => {
  return (
    <div>
      {activeTab === tabs?.[0] && <Summary data={data} setData={setData} />}
      {activeTab === tabs?.[1] && <Contacts />}
      {activeTab === tabs?.[2] && <Notes />}
      {activeTab === tabs?.[3] && <Activities />}
      {activeTab === tabs?.[4] && <Email />}
      {activeTab === tabs?.[5] && <Files />}
      {activeTab === tabs?.[6] && <History />}
    </div>
  );
};

export default TabContent;
