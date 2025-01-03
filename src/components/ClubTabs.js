/* eslint-disable react/no-array-index-key */

'use client';

import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

export default function ClubTabs({ children }) {
  const [activeTab, setActiveTab] = useState('Book Club Hub');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Tabs value={activeTab}>
      <TabsHeader className="tab-responsive">
        {React.Children.map(children, (child) =>
          child ? (
            <Tab key={child.props?.label} value={child.props?.label} onClick={() => handleTabChange(child.props.label)}>
              {child.props?.label}
            </Tab>
          ) : null,
        )}
      </TabsHeader>
      <TabsBody>
        {children.map((child, index) => (
          <TabPanel key={`${child.props?.label}-${index}`} value={child.props?.label}>
            {activeTab === child.props?.label && child}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}

ClubTabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
