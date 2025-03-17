import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_DEVICES = gql`
  query GetDevices($first: Int, $after: String) {
    devices(first: $first, after: $after) {
      edges {
        node {
          id
          name
          status
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const DeviceList = () => {
  const { data, fetchMore } = useQuery(GET_DEVICES, { variables: { first: 10 } });

  return (
    <div>
      {data?.devices?.edges.map(({ node }) => (
        <div key={node.id}>{node.name}</div>
      ))}
      
      {data?.devices?.pageInfo.hasNextPage && (
        <button
          onClick={() =>
            fetchMore({
              variables: {
                first: 10,
                after: data.devices.pageInfo.endCursor,
              },
              updateQuery: (prev, { fetchMoreResult }) => ({
                devices: {
                  edges: [
                    ...prev.devices.edges,
                    ...fetchMoreResult.devices.edges
                  ],
                  pageInfo: fetchMoreResult.devices.pageInfo,
                },
              }),
            })
          }
        >
          Load More
        </button>
      )}
    </div>
  );
};
