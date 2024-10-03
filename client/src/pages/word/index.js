import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { networkAnswerWord } from "../../network";
import Radio from "./../../components/common/Radio";

const Word = () => {
  const navigate = useNavigate();
  const { data } = useLoaderData();
  const [formData, setFormData] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestData = {
      questions_answers: formData,
      word_id: data.word.id,
    };
    try {
      const res = await networkAnswerWord(requestData);
      if (res.status === 201) {
        setFormData({});
        navigate("/word");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AnimatePresence>
      <motion.section
        key={data.word.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="prose mx-auto size-full flex flex-col justify-center items-center px-8 overflow-y-auto pb-10"
      >
        {/* <h2>به کارهینانی ئه م وشه یانه ده سورانیدا له چ ئاستیکدانه؟ </h2> */}

        <h1 className="text-xl md:text-2xl xl:text-3xl">
          <q> {data?.word?.word} </q>
        </h1>

        <form
          onSubmit={handleSubmit}
          className="container h-2/4 *:mb-16 last:*:mb-0"
        >
          {data?.questions?.map((quesItem, index) => (
            <div
              key={quesItem?.question_id}
              className={twMerge(
                `questions-wrapper first:*:before:size-2 first:*:before:rounded-full first:*:before:inline-block first:*:before:my-1 first:*:before:mx-2`,
                index === 0
                  ? `first:*:before:bg-[var(--primary-color)]`
                  : index === 1
                  ? "first:*:before:bg-[var(--secondary-color)]"
                  : "first:*:before:bg-[var(--accent-color)]"
              )}
            >
              <p className="text-lg font-bold">{quesItem?.passage}</p>
              <div className="grid md:grid-cols-2 gap-4">
                {quesItem?.answers?.map((answerItem) => (
                  <Radio
                    key={answerItem.id}
                    className={
                      index === 0
                        ? `radio-primary`
                        : index === 1
                        ? "radio-secondary"
                        : "radio-accent"
                    }
                    name={quesItem?.question_id}
                    label={answerItem?.text}
                    value={answerItem.id}
                    checked={formData[quesItem.question_id] === answerItem.id}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        [quesItem.question_id]: answerItem.id,
                      }))
                    }
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="flex justify-end items-center w-full mt-5">
            <button className="btn btn-success btn-fill" type="submit">
              وشەی داهاتوو
            </button>
          </div>
        </form>
      </motion.section>
    </AnimatePresence>
  );
};

export default Word;
