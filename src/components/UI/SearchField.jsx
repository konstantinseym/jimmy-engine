import { forwardRef } from "react";
import Search from "./svg/Search";
import { SEARCH_VALIDATION_RULES } from "../../utils/validationRules";

const SearchField = forwardRef(function InputField({ value, onChange }, ref) {
  return (
    <div className="relative">
      <input
        ref={ref}
        type="text"
        className="text-palette-white focus:border-accent h-8 w-48 rounded-full border border-white/50 pr-3 pl-8 text-xs outline-0 transition"
        placeholder="search..."
        value={value}
        onChange={onChange}
        maxLength={SEARCH_VALIDATION_RULES.max}
      />
      <div className="absolute top-2.5 left-3">
        <Search width="12" />
      </div>
    </div>
  );
});

export default SearchField;
