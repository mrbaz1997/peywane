import React from "react";
import Radio from "./../../components/common/Radio";
import { useParams } from "react-router";
import { AnimatePresence, motion } from "framer-motion";

const Word = () => {
  const { id } = useParams();
  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 25,
          // delay: 1,
        }}
        className="prose mx-auto size-full flex flex-col justify-center items-center px-8 overflow-y-auto pb-10"
      >
        <h2>به کارهینانی ئه م وشه یانه ده سورانیدا له چ ئاستیکدانه؟ </h2>

        <h1 className="text-xl md:text-2xl xl:text-3xl">
          <q> {id} </q>
        </h1>

        <div className="container h-2/4 *:mb-16 last:*:mb-0">
          <div className="questions-wrapper first:*:before:bg-[var(--primary-color)] first:*:before:size-2 first:*:before:rounded-full first:*:before:inline-block first:*:before:my-1 first:*:before:mx-2">
            <p className="text-lg font-bold">
              تا چەند ئەم وشەیە لە گفتوگۆی ڕۆژانەدا ئاساییە؟
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <Radio
                className="radio-primary"
                name={"question-1"}
                label={"وشەیەکی جوان نییه و ئاسایی نییه"}
              />
              <Radio
                className="radio-primary"
                name={"question-1"}
                label={"کوردییە بەڵام باو نییه"}
              />
              <Radio
                className="radio-primary"
                name={"question-1"}
                label={"کوردی نییە و ئاسایی نییه "}
              />
              <Radio
                className="radio-primary"
                name={"question-1"}
                label={"ئاساییە"}
              />
            </div>
          </div>
          <div className="questions-wrapper first:*:before:bg-[var(--secondary-color)] first:*:before:size-2 first:*:before:rounded-full first:*:before:inline-block first:*:before:my-1 first:*:before:mx-2">
            <p className="text-lg font-bold">
              ئەم وشەیە چەندە لە قسەی ڕۆژانەدا بەکاردێت؟
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <Radio
                className="radio-secondary"
                name={"question-2"}
                label={"نەمبیستووە"}
              />
              <Radio
                className="radio-secondary"
                name={"question-2"}
                label={"کەم"}
              />
              <Radio
                className="radio-secondary"
                name={"question-2"}
                label={"مامناوەند"}
              />
              <Radio
                className="radio-secondary"
                name={"question-2"}
                label={"زۆر"}
              />
            </div>
          </div>
          <div className="questions-wrapper first:*:before:bg-[var(--tertiary-color)] first:*:before:size-2 first:*:before:rounded-full first:*:before:inline-block first:*:before:my-1 first:*:before:mx-2">
            <p className="text-lg font-bold">
              تا چەند سەختە بۆ مرۆڤی ئاسایی تێبگات و بەکاری بهێنێ لەم وشەیە؟
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <Radio
                className="radio-accent"
                name={"question-3"}
                label={"زۆر ئاسانە"}
              />
              <Radio
                className="radio-accent"
                name={"question-3"}
                label={"ئاسانە"}
              />
              <Radio
                className="radio-accent"
                name={"question-3"}
                label={"سەخته"}
              />
              <Radio
                className="radio-accent"
                name={"question-3"}
                label={"زۆر سەختە"}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center w-full mt-10">
          <button className="btn btn-success btn-fill ">وشەی داهاتوو</button>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default Word;
