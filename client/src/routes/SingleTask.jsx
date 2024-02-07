import React from "react";
import { useParams } from "react-router-dom";

function SingleTask() {
  const { taskId } = useParams();

  return <div>test</div>;
}

export default SingleTask;
