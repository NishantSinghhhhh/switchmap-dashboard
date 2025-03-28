import { ApolloClient, InMemoryCache } from '@apollo/client';
import { useMutation } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://your-graphql-endpoint.com/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Device: {
        keyFields: ['id'], // Ensure cache identifies devices uniquely
      },
    },
  }),
});

const [updateDevice] = useMutation(UPDATE_DEVICE_MUTATION, {
  update(cache, { data: updateDevice }) {
    const existingDevices = cache.readQuery<{ devices: Array<{ id: string }> }>(
      { query: GET_DEVICES }
    );
    if (existingDevices) {
      cache.writeQuery({
        query: GET_DEVICES,
        data: {
          devices: existingDevices.devices.map((device) =>
            device.id === updateDevice.id ? updateDevice : device
          ),
        },
      });
    }
  },
});
