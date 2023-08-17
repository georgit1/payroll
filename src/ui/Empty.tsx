type EmptyProps = {
  resourceName: string;
};

const Empty = ({ resourceName }: EmptyProps) => {
  return <p>No {resourceName} could be found.</p>;
};

export default Empty;
