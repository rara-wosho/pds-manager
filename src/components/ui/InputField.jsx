import { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

function InputField({
    type = "text",
    placeholder = "",
    name = "",
    required,
    value,
    onChange,
}) {
    const [showPassword, setShowPassword] = useState(false);

    const getInputType = () => {
        if (type === "password") {
            return showPassword ? "text" : "password";
        }
        return type;
    };

    return (
        <div className="center position-relative">
            <input
                type={getInputType()}
                className="form-control w-100 border-0"
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={onChange}
                name={name}
            />
            {type === "password" && (
                <div
                    style={{ position: "absolute", right: 12 }}
                    className="cursor"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <FaRegEye size={20} />
                    ) : (
                        <FaRegEyeSlash size={20} />
                    )}
                </div>
            )}
        </div>
    );
}

export default InputField;
