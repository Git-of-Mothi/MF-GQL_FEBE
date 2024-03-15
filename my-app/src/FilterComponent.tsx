import React from "react";

interface FilterComponentProps {
  handleBusinessTypeFilter: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  filterBusinessType: string[];
  handlePaymentOptionFilter: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  filterPaymentOption: string[];
  clearFilters: () => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  handleBusinessTypeFilter,
  filterBusinessType,
  handlePaymentOptionFilter,
  filterPaymentOption,
  clearFilters,
}) => {
  return (
    <>
      <div>
        <h3 className="filter-gap">Filter by business type:</h3>
        <input
          type="checkbox"
          id="Small Business"
          value="Small Business"
          onChange={handleBusinessTypeFilter}
          checked={filterBusinessType.includes("Small Business")}
        />
        <label className="light-font" htmlFor="Small Business">
          Small business
        </label>
        <br />
        <input
          type="checkbox"
          id="Enterprise"
          value="Enterprise"
          onChange={handleBusinessTypeFilter}
          checked={filterBusinessType.includes("Enterprise")}
        />
        <label className="light-font" htmlFor="Enterprise">
          Enterprise
        </label>
        <br />
        <input
          type="checkbox"
          id="Entrepreneur"
          value="Entrepreneur"
          onChange={handleBusinessTypeFilter}
          checked={filterBusinessType.includes("Entrepreneur")}
        />
        <label className="light-font" htmlFor="Entrepreneur">
          Entrepreneur
        </label>
      </div>
      <div>
        <h3 className="filter-gap">Filter by payment option:</h3>
        <input
          type="checkbox"
          id="Cash on Delivery"
          value="Cash on Delivery"
          onChange={handlePaymentOptionFilter}
          checked={filterPaymentOption.includes("Cash on Delivery")}
        />
        <label className="light-font" htmlFor="Cash on Delivery">
          Cash on delivery
        </label>
        <br />
        <input
          type="checkbox"
          id="UPI"
          value="UPI"
          onChange={handlePaymentOptionFilter}
          checked={filterPaymentOption.includes("UPI")}
        />
        <label className="light-font" htmlFor="UPI">
          UPI
        </label>
        <br />
        <input
          type="checkbox"
          id="Card payment"
          value="Card payment"
          onChange={handlePaymentOptionFilter}
          checked={filterPaymentOption.includes("Card payment")}
        />
        <label className="light-font" htmlFor="Card payment">
          Card payment
        </label>
        <br />

        <button className="buttonDesign" onClick={clearFilters}>
          Clear all filter(s)
        </button>
      </div>
    </>
  );
};

export default FilterComponent;
