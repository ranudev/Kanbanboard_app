import { Button, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import Table from "../table/Table";

const KanBanBoard = () => {
  const [listdata, setListdata] = useState(); //inputlistdata
  const [status, setStatus] = useState(false); // forwardbtnstatus
  const [dstatus, setDstatus] = useState(false); // deletebtn status
  const [bstatus, setBstatus] = useState(false); //backwardbtn status

  const [move, setMove] = useState({
    itemlist: "",
    tableindex: "",
    itemindex: "",
  }); //movable data

  const [listitem, setListitem] = useState([
    { title: "Backlog", status: "backlog", list: [] },
    { title: "ToDo", status: "todo", list: [] },
    { title: "Ongoing", status: "ongoing", list: [] },
    { title: "Done", status: "done", list: [] },
  ]);

  const CreateHandler = () => {
    const datas = [...listitem];
    const id = Date.now();
    if (listdata.trim()) {
      datas[0].list.push({ listdata: listdata, id: id });
      setListitem(datas);
      setListdata("");
    }
  };

  const selectHandler = (tableindex, listindex) => {
    setMove({
      id: listitem[tableindex].list[listindex].id,
      itemlist: listitem[tableindex].list[listindex].listdata,
      tableindex: tableindex,
    });
  };

  useEffect(() => {
    if (listitem.length - 1 === move.tableindex || move.tableindex === "") {
      setStatus(true);
    } else {
      setStatus(false);
    }
    if (move.tableindex === 0 || move.tableindex === "") {
      setBstatus(true);
    } else {
      setBstatus(false);
    }
    if (move.tableindex === "") {
      setDstatus(true);
    } else {
      setDstatus(false);
    }
  }, [move.tableindex]);

  const inputKeyUpHandler = (event) => {
    if (event.key === "Enter") {
      CreateHandler();
    }
  };

  const moveforward = () => {
    listitem.map((lists, tindex) =>
      lists.list.map((elem, lindex) => {
        console.log(lists, "listsssssssssss");
        if (elem.id === move.id && tindex === move.tableindex) {
          const datas = [...listitem];
          datas[tindex + 1].list.push(elem);
          datas[tindex].list.splice(lindex, 1);
          const updateMove = {
            tableindex: tindex + 1,
            id: elem.id,
            itemlist: elem.listdata,
          };
          setMove(updateMove);
          setListitem(datas);
        }
      })
    );
  };

  const moveBackward = () => {
    listitem.map((lists, tindex) =>
      lists.list.map((elem, lindex) => {
        console.log(lists, "listsssssssssss");
        if (elem.id === move.id && tindex === move.tableindex) {
          const datas = [...listitem];
          datas[tindex - 1].list.push(elem);
          datas[tindex].list.splice(lindex, 1);
          const updateMove = {
            tableindex: tindex - 1,
            id: elem.id,
            itemlist: elem.listdata,
          };
          setMove(updateMove);
          setListitem(datas);
        }
      })
    );
  };

  const deleteHandler = () => {
    listitem.map((lists, tindex) =>
      lists.list.map((elem, lindex) => {
        if (elem.id === move.id && tindex === move.tableindex) {
          const datas = [...listitem];
          datas[tindex].list.splice(lindex, 1);
          const updateMove = {
            tableindex: "",
            id: "",
            itemlist: "",
          };
          setMove(updateMove);
          setListitem(datas);
        }
      })
    );
  };

  // const dropdowntHandler = (e) => {
  //   const value = e.target.value;
  //   console.log(value);
  //   listitem.map((list, tindex) => {
  //     if (list.title.toLowerCase() === value.toLowerCase()) {
  //       console.log(list, "44444");

  //       // list.list.map((item,lindex)=>{
  //       // if(item.id === move.id && tindex === move.tableindex){
  //       //     const datas = [...listitem]
  //       //     console.log(datas,'////')
  //       //     datas[tindex].list.push(move.itemlist);
  //       //     setListitem(datas)
  //       // }
  //       const datas = [...listitem];
  //       datas[tindex].list.push(move.itemlist);

  //       setListitem(() => datas);
  //       console.log(listitem, "////");

  //       // })
  //     }
  //   });
  // };

  return (
    <>
      <div style={{ backgroundColor: "#00FFFF" }}>
        <Typography
          sx={{ fontSize: "30px", color: "#454545", fontWeight: "bold" }}
        >
          KanBanBoard App
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "30px",
            alignItems: "baseline",
            padding: "20px",
          }}
        >
          <div
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              marginBottom: "20px",
            }}
          >
            <TextField
              onChange={(e) => setListdata(e.target.value)}
              value={listdata}
              onKeyUp={inputKeyUpHandler}
            />
            <Button
              onClick={CreateHandler}
              variant="contained"
              sx={{ bgcolor: "#008000", color: "white", height: "52px", ml: 1 }}
            >
              Create
            </Button>
          </div>

          <div>
            <TextField value={move.itemlist} sx={{ marginRight: "10px" }} />
            <Button
              sx={{ color: "white", height: "52px", mr: 1 }}
              onClick={moveBackward}
              variant="contained"
              disabled={bstatus}
            >
              Move Back
            </Button>
            <Button
              sx={{ color: "white", height: "52px", bgcolor: "#800080", mr: 1 }}
              onClick={moveforward}
              variant="contained"
              disabled={status}
            >
              Move Forward
            </Button>
            <Button
              sx={{ color: "white", height: "52px", bgcolor: "#DE3163" }}
              variant="contained"
              disabled={dstatus}
              onClick={deleteHandler}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      <Table handler={selectHandler} list={listitem} />
    </>
  );
};

export default KanBanBoard;
