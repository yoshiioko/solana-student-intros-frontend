import { Card } from "./Card";
import { FC, useEffect, useState } from "react";
import { StudentIntro } from "../models/StudentIntro";
import * as Web3 from "@solana/web3.js";

const STUDENT_INTRO_PROGRAM_ID = "HdE95RSVsdb315jfJtaykXhXY478h53X6okDupVfY9yf";

export const StudentIntroList: FC = () => {
  const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"));
  const [studentIntros, setStudentIntros] = useState<StudentIntro[]>([]);

  useEffect(() => {
    connection
      .getProgramAccounts(new Web3.PublicKey(STUDENT_INTRO_PROGRAM_ID))
      .then(async (accounts) => {
        const students: StudentIntro[] = accounts.reduce(
          (accum: StudentIntro[], { pubkey, account }) => {
            const student = StudentIntro.deserialize(account.data);
            if (!student) {
              return accum;
            }

            return [...accum, student];
          },
          []
        );
        setStudentIntros(students);
      });
  }, []);

  return (
    <div>
      {studentIntros.map((studentIntro, i) => (
        <Card key={i} studentIntro={studentIntro} />
      ))}
    </div>
  );
};
