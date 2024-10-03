import { AnimatePresence, motion } from "framer-motion";

const Input = ({
  label,
  placeholder,
  register,
  type,
  helperText,
  className,
  ...reset
}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-harmattan">{label}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered font-harmattan"
        {...register}
        {...reset}
      />
      <AnimatePresence>
        {!!helperText && (
          <motion.label
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            className="label-text text-error mt-1 px-2 font-harmattan"
          >
            {helperText}
          </motion.label>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Input;
