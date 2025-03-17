import React, { useMemo } from 'react';

const DeviceList = ({ devices }) => {
  const activeDevices = useMemo(
    () => devices.filter((device) => device.status === 'active'),
    [devices]
  );
  // Only recalculates when `devices` change, and only if any value
  // in `devices` has changed

  return (
    <div>
      {activeDevices.map(({ id, name }) => (
        <div key={id}>{name}</div>
      ))}
    </div>
  );
};

export default DeviceList;
