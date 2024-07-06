import React, { useEffect, useState } from "react";
import { deleteData, getData, postData, putData } from "../../services";
import Table from "../../components/hkTable";
import PageHeader from "../../components/pageHeader";
import Dialog from "../../components/dialog";
import ProductDetailsForm from "../../components/froms/product";
import { DeleteIcon, EditIcon } from "../../icons";
import DeletePopup from "../../components/froms/deletePopup";

const TABLE_COLUMNS = [
  {
    fieldName: "id",
    headName: "ID",
    className: "w-[150px] text-center",
  },
  {
    fieldName: "name",
    headName: "Name",
    className: "w-[200px]",
  },
  {
    fieldName: "price",
    headName: "Price",
    className: "w-[200px]",
  },
  {
    fieldName: "brand",
    headName: "Brand",
    className: "w-[200px]",
  },
  {
    fieldName: "category",
    headName: "Category",
    className: "w-[150px]",
  },
  {
    fieldName: "edit",
    headName: "Edit",
    className: "w-[100px]",
  },
  {
    fieldName: "delete",
    headName: "Delete",
    className: "w-[100px]",
  },
];

const UsersList = () => {
  const [rows, setRows] = useState([]);
  const [pageLoad, setPageLoad] = useState(false);
  const [pop, setPop] = useState({
    isDelete: false,
    isEdit: false,
    isCreate: false,
  });
  const [editData, setEditData] = useState(null);
  const [deletedObj, setDeletedObj] = useState(null);
  const [putID, setPutID] = useState(null);

  useEffect(() => {
    getResponseData();
  }, [pageLoad]);

  const handleOpen = (item) => {
    const { id, name } = item;
    setDeletedObj({ ID: id, Name: name });
    setPop({ ...pop, isDelete: true });
  };

  const handleEditOpen = (item) => {
    const { id, name, price, brand, category } = item;
    setEditData({name, price, brand, category });
    setPutID(id)
    setPop({ ...pop, isEdit: true });
  };

  const handleEditClose = () => {
    setPop({ ...pop, isEdit: false });
  };

  const handleCreateOpen = () => {
    setPop({ ...pop, isCreate: true });
  };

  const handleCreateClose = () => {
    setPop({ ...pop, isCreate: false });
  };

  const getResponseData = async () => {
    try {
      const response = await getData();
      setRows(response);
      let result = transformRows(response);
      setRows(result);
      // console.log(response, "this data coming frontend");
    } catch (err) {
      console.log(err, "data failed");
    }
  };

  const handlePostRequest = async (formData) => {
    try {
      const response = await postData({
        ...formData,
        price: parseInt(formData.price),
      });
      setPageLoad((prev) => !prev);
      // console.log(response, "this post data coming frontend");
    } catch (err) {
      console.log(err, "post req data failed");
    }
  };

  const handlePutRequest = async (formData) => {
    try {
      const response = await putData(putID,{
        ...formData,
        price: parseInt(formData.price),
      });
      setPageLoad((prev) => !prev);
      // console.log(response, "this post data coming frontend");
    } catch (err) {
      console.log(err, "post req data failed");
    }
  };

  const onDeleteList = async() => {
    try {
      const response = await deleteData(deletedObj.ID);
      setPageLoad((prev) => !prev);
      // console.log(response, "this post data coming frontend");
    } catch (err) {
      console.log(err, "post req data failed");
    }
  };

  function transformRows(response) {
    response.forEach((res) => {
      res.edit = getEditComponent(res);
      res.delete = getDeleteComponent(res);
    });
    return response;
  }
  function getEditComponent(item) {
    return (
      <div onClick={() => handleEditOpen(item)}>
        <EditIcon />
      </div>
    );
  }
  function getDeleteComponent(item) {
    return (
      <div>
        <DeleteIcon onClick={() => handleOpen(item)} />
      </div>
    );
  }

  return (
    <div className="h-screen mx-10">
      <PageHeader title="Product Details" onClick={handleCreateOpen} />
      {rows ? (
        <Table rows={rows} columns={TABLE_COLUMNS} />
      ) : (
        <div className="flex justify-center items-center h-screen text-black font-bold text-2xl">
          Sorry No Data Found
        </div>
      )}

      {pop.isCreate && (
        <Dialog
          closeModal={handleCreateClose}
          isOpen={pop.isCreate}
          createClick={pop.isCreate}
          title="Product Details"
          childrenClass={"w-[50%] p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <ProductDetailsForm
            isEdit={pop.isCreate}
            close={handleCreateClose}
            editData={{ name: "", price: "", brand: "", category: "" }}
            handleRequest={handlePostRequest}
            value="Create"
            create={true}
            createClick={pop.isCreate}
          />
        </Dialog>
      )}

      {pop.isEdit && (
        <Dialog
          closeModal={handleEditClose}
          isOpen={pop.isEdit}
          title="Product-Details"
          childrenClass={"w-[50%] p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <ProductDetailsForm
            isEdit={pop.isEdit}
            close={handleEditClose}
            editData={editData}
            handleRequest={handlePutRequest}
            value="Update"
          />
        </Dialog>
      )}

      {pop.isDelete && deletedObj !== null && (
        <DeletePopup
          // isOpen={pop.isOpen}
          deletedObj={deletedObj}
          setIsOpen={setPop}
          // close={handleClose}
          title="Product-Details"
          onDeleteList={onDeleteList}
        />
      )}
    </div>
  );
};

export default UsersList;
