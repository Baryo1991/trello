import { axiosConfig as axios, createTokenHeaders } from "./../axios";

export const getAllColumns = async () => {
  try {
    const config = createTokenHeaders();
    const { data } = await axios.get("/columns", config);
    return {
      columns: data.data,
    };
  } catch (error) {
    console.error(error);
    return {
      error: error.response?.data.message || error.message,
    };
  }
};

export const createColumn = async (column) => {
  try {
    const config = createTokenHeaders();
    const { data } = await axios.post(`/columns`, column, config);
    return {
      column: data.data,
    };
  } catch (error) {
    console.error(error);
    return {
      error: error.response?.data.message || error.message,
    };
  }
};

export const updateColumn = async (id, updatedColumn) => {
  try {
    const config = createTokenHeaders();
    await axios.patch(`/columns/${id}`, updatedColumn, config);
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      error: error.response?.data.message || error.message,
    };
  }
};

export const deleteColum = async (id) => {
  try {
    const config = createTokenHeaders();
    const { data } = await axios.delete(`/columns/${id}`, config);
    return {
      data,
    };
  } catch (error) {
    console.error(error);
    return {
      error: error.response.data.message || error.message,
    };
  }
};

export const updateManyColumns = async (columns) => {
  try {
    const config = createTokenHeaders();
    const { data } = await axios.patch(`/updateMany`, columns, config);
    return {
      data,
    };
  } catch (error) {
    console.error(error);
    return {
      error: error.response.data.message || error.message,
    };
  }
};
