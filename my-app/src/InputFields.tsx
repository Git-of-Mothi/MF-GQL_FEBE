import React, { ChangeEvent, FormEvent, useEffect, useCallback } from "react";
import { inputData } from "./Types";

interface InputFieldsProps {
  formData: inputData;
  setFormData: React.Dispatch<React.SetStateAction<inputData>>;
  handleCreate: () => Promise<void>;
  handleUpdate: () => Promise<void>;
  editId: string | null;
}

const InputFields: React.FC<InputFieldsProps> = ({
  formData,
  setFormData,
  handleCreate,
  handleUpdate,
  editId,
}) => {
  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editId) {
      await handleUpdate();
    } else {
      await handleCreate();
    }
  };

  const resetForm = useCallback(() => {
    setFormData({
      fname: "",
      mail: "",
      number: "",
      website: "",
      contactName: "",
      contactPhone: "",
      contactMail: "",
      notes: "",
      type: "",
      category: "",
      percentage: "",
      activeFrom: "",
      criticalAccount: "",
      paymentOptions: "",
    });
  }, [setFormData]);

  useEffect(() => {
    if (!editId) {
      resetForm();
    }
  }, [editId, resetForm]);

  return (
    <div>
      <form onSubmit={submitForm} id="form">
        <table className="table1">
          <label htmlFor="fname">
            <b>
              Name:<span className="mandatory">*</span>
            </b>
          </label>
          <br />
          <input
            type="text"
            id="fname"
            name="fname"
            value={formData.fname}
            onChange={handleInputChange}
            autoFocus
            required
          />
          <br />
          <label htmlFor="mobile">
            <b>Email:</b>
          </label>
          <br />
          <input
            type="email"
            id="mail"
            name="mail"
            value={formData.mail}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="tel">
            <b>Mobile number:</b>
          </label>
          <br />
          <input
            type="tel"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="website">
            <b>Website:</b>
          </label>
          <br />
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="contact">
            <b>Contact name:</b>
          </label>
          <br />
          <input
            type="text"
            id="contact-Name"
            name="contactName"
            value={formData.contactName}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="number">
            <b>Contact number:</b>
          </label>
          <br />
          <input
            type="tel"
            id="contact-number"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="e-mail">
            <b>Contact email:</b>
          </label>
          <br />
          <input
            type="email"
            id="Contact-email"
            name="contactMail"
            value={formData.contactMail}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="notes">
            <b>Notes:</b>
          </label>
          <br />
          <input
            type="text"
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="text" className="type">
            <b>Type:</b>
          </label>
          <br />
          <input
            type="radio"
            id="type-variety"
            name="type"
            value="Small Business"
            checked={formData.type === "Small Business"}
            onChange={handleInputChange}
          />
          <label style={{ fontWeight: "normal" }} htmlFor="text">
            Small Business
          </label>
          <br />
          <input
            type="radio"
            id="type-variety"
            name="type"
            value="Enterprise"
            checked={formData.type === "Enterprise"}
            onChange={handleInputChange}
          />
          <label style={{ fontWeight: "normal" }} htmlFor="text">
            Enterprise
          </label>
          <br />
          <input
            type="radio"
            id="type-variety"
            name="type"
            value="Entrepreneur"
            checked={formData.type === "Entrepreneur"}
            onChange={handleInputChange}
          />
          <label style={{ fontWeight: "normal" }} htmlFor="text">
            Entrepreneur
          </label>
          <br />
          <label htmlFor="text">
            <b>Category:</b>
          </label>
          <br />
          <select
            id="category-variety"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="Clothes">Clothes</option>
            <option value="Toys">Toys</option>
            <option value="Groceries">Groceries</option>
            <option value="Electronics">Electronics</option>
            <option value="Digital">Digital</option>
          </select>
          <br />
          <label htmlFor="percentage">
            <b>Commission percentage:</b>
          </label>
          <br />
          <input
            type="number"
            id="percentage"
            name="percentage"
            min="0"
            max="30"
            value={formData.percentage}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="ActiveFrom" className="activeFrom">
            <b>Active from:</b>
          </label>
          <br />
          <input
            type="date"
            id="duration"
            name="activeFrom"
            value={formData.activeFrom}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="image" className="Logo">
            <b>Company logo:</b>
          </label>
          <br />
          <input
            type="file"
            id="image"
            name="Logo"
            onChange={handleInputChange}
          />
          <br />
          <label>
            <b>Critical Account:</b>
          </label>
          <br />
          <input
            type="radio"
            id="yes"
            name="criticalAccount"
            value="Yes"
            checked={formData.criticalAccount === "Yes"}
            onChange={handleInputChange}
          />
          <label style={{ fontWeight: "normal" }}>Yes</label>
          <br />
          <input
            type="radio"
            id="no"
            name="criticalAccount"
            value="No"
            checked={formData.criticalAccount === "No"}
            onChange={handleInputChange}
          />
          <label style={{ fontWeight: "normal" }}>No</label>
          <br />
          <label>
            <b>Payment options:</b>
          </label>
          <br />
          <input
            type="radio"
            id="cash"
            name="paymentOptions"
            value="Cash on Delivery"
            checked={formData.paymentOptions === "Cash on Delivery"}
            onChange={handleInputChange}
          />
          <label style={{ fontWeight: "normal" }}>Cash on delivery</label>
          <br />
          <input
            type="radio"
            id="online"
            name="paymentOptions"
            value="UPI"
            checked={formData.paymentOptions === "UPI"}
            onChange={handleInputChange}
          />
          <label style={{ fontWeight: "normal" }}>UPI</label>
          <br />
          <input
            type="radio"
            id="card"
            name="paymentOptions"
            value="Card payment"
            checked={formData.paymentOptions === "Card payment"}
            onChange={handleInputChange}
          />
          <label style={{ fontWeight: "normal" }}>Card payment</label>
          <br />{" "}
          <button type="submit" className="buttonDesign">
            {editId ? "Update Data" : "Create Data"}
          </button>
          <button type="reset" className="buttonDesign" onClick={resetForm}>
            Reset
          </button>
          <br />
          <button className="outputtablebtn">
            {/* <Link style={{ color: "black" }} to="/outputtable"> */}
            Show Datas
            {/* </Link> */}
          </button>
        </table>
      </form>
    </div>
  );
};

export default InputFields;
