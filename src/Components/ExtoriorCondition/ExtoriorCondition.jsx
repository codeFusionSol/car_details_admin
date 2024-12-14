import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  addDataToCarDetailsSuccess,
  updateDataToCarDetailsSuccess,
} from "../../redux/Slices/CarDetail_id";
import api from "../../../utils/url";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps";
import { Toaster, toast } from "sonner";


const ExtoriorCondition = () => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const { carDetailsId , fullDetaills } = useSelector((state) => state.carDetailsId);

  useEffect(() => {
    if (fullDetaills?.length > 12) {
      setRightView(fullDetaills[12].rightView);
      setTopView(fullDetaills[12].topView);
      setLeftView(fullDetaills[12].leftView);
      setEditMode(true);
    }
  }, [fullDetaills]);

  const [rightView, setRightView] = useState([
    { name: "Front Right Fender", value: [] },
    { name: "Right Foot Board", value: [] },
    { name: "Front Right Door 1", value: [] },
    { name: "Front Right Door 2", value: [] },
    { name: "Rear Right Fender", value: [] },
  ]);

  const [topView, setTopView] = useState([
    { name: "Front Bumper", value: [] },
    { name: "Bonnet", value: [] },
    { name: "Roof", value: [] },
    { name: "Trunk", value: [] },
    { name: "Rear Bumper", value: [] },
  ]);

  const [leftView, setLeftView] = useState([
    { name: "Front Left Fender", value: [] },
    { name: "Front Left Door 1", value: [] },
    { name: "Front Left Door 2", value: [] },
    { name: "Left Foot Board", value: [] },
    { name: "Rear Left Fender", value: [] },
  ]);

  const checkboxOptions = [
    { label: "A1 Small Scratch", value: "A1" },
    { label: "A2 Scratch", value: "A2" },
    { label: "B1 Small dent with scratch (size like a thumb)", value: "B1" },
    { label: "B2 Dent with scratch (size like flat of the hand)", value: "B2" },
    { label: "D2 Dent", value: "D2" },
    { label: "P Paint Marked", value: "P" },
  ];

  const handleCheckboxChange = (viewType, itemIndex, value) => {
    switch (viewType) {
      case "right":
        setRightView(prevView => {
          const updatedView = [...prevView];
          const currentValues = [...updatedView[itemIndex].value];
          if (currentValues.includes(value)) {
            updatedView[itemIndex] = {
              ...updatedView[itemIndex],
              value: currentValues.filter(v => v !== value)
            };
          } else {
            updatedView[itemIndex] = {
              ...updatedView[itemIndex],
              value: [...currentValues, value]
            };
          }
          return updatedView;
        });
        break;
      case "top":
        setTopView(prevView => {
          const updatedView = [...prevView];
          const currentValues = [...updatedView[itemIndex].value];
          if (currentValues.includes(value)) {
            updatedView[itemIndex] = {
              ...updatedView[itemIndex],
              value: currentValues.filter(v => v !== value)
            };
          } else {
            updatedView[itemIndex] = {
              ...updatedView[itemIndex],
              value: [...currentValues, value]
            };
          }
          return updatedView;
        });
        break;
      case "left":
        setLeftView(prevView => {
          const updatedView = [...prevView];
          const currentValues = [...updatedView[itemIndex].value];
          if (currentValues.includes(value)) {
            updatedView[itemIndex] = {
              ...updatedView[itemIndex],
              value: currentValues.filter(v => v !== value)
            };
          } else {
            updatedView[itemIndex] = {
              ...updatedView[itemIndex],
              value: [...currentValues, value]
            };
          }
          return updatedView;
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post("/exteriorCondition/add", {
        rightView,
        leftView,
        topView,
        carDetailsId,
      });

      if (response.data.success) {
        if (response.data) {
          toast("Exterior Condition Added!", {
            style: {
              padding: "16px",
            },
          });
          setTimeout(() => {
            dispatch(addDataToCarDetailsSuccess(response?.data?.data));
            dispatch(changeStepSuccess(13));
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Error saving exterior condition:", error);
      alert("Error saving exterior condition");
    }
  };

  const renderCheckboxes = (viewType, itemIndex, selectedValues) => {
    return checkboxOptions.map((option, idx) => (
      <div key={idx} className="form-check">
        <input
          type="checkbox"
          className="form-check-input "
          checked={selectedValues.includes(option.value)}
          onChange={() =>
            handleCheckboxChange(viewType, itemIndex, option.value)
          }
          id={`${viewType}-${itemIndex}-${option.value}`}
        />
        <label
          className="form-check-label"
          htmlFor={`${viewType}-${itemIndex}-${option.value}`}
        >
          {option.label}
        </label>
      </div>
    ));
  };

  const handleEdit = async () => {
    try {
      const response = await api.put(`/exteriorCondition/update/${fullDetaills[12]._id}`, {
        rightView,
        leftView,
        topView,
      });
      if (response.data.success) {
        toast("Exterior Condition Updated!", {
          style: {
            padding: "16px",
          },
        });
      }

      setTimeout(() => {
        dispatch(updateDataToCarDetailsSuccess(response?.data?.data));
        dispatch(changeStepSuccess(13));
      }, 2000);
    } catch (error) {
      console.error("Error editing exterior condition:", error);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
          <h3>Right View</h3>
          <br />
          {rightView.map((item, index) => (
            <div key={index} className="mb-4">
              <h5>{item.name}</h5>
              <br />
              {renderCheckboxes("right", index, item.value)}
            </div>
          ))}
        </div>

        <div className="col-md-4">
          <h3>Top View</h3>
          <br />
          {topView.map((item, index) => (
            <div key={index} className="mb-4">
              <h5>{item.name}</h5>
              <br />
              {renderCheckboxes("top", index, item.value)}
            </div>
          ))}
        </div>

        <div className="col-md-4">
          <h3>Left View</h3>
          <br />
          {leftView.map((item, index) => (
            <div key={index} className="mb-4">
              <h5>{item.name}</h5>
              <br />
              {renderCheckboxes("left", index, item.value)}
            </div>
          ))}
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12 text-center">
          <button
            className="nextBtn"
            onClick={!editMode ? handleSubmit : handleEdit}
          >
            {editMode ? "Update" : "Next"}
          </button>
        </div>
      </div>
    </div>
    <Toaster position="top-right" />
    </>
  );
};

export default ExtoriorCondition;
