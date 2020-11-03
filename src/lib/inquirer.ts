import inquirer from "inquirer";

export const askForAttribute = () => {
  const questions = [
    {
      name: "attribute",
      type: "input",
      message:
        "Enter block attribute by you want to search block for (hash or number):",
      validate: function (value: string) {
        if (value === "hash" || value === "number") {
          return true;
        } else {
          return "Please Enter block attribute (hash or number)";
        }
      },
    },
  ];
  return inquirer.prompt(questions);
};

export const askForValue = (isAttributeHash: boolean) => {
  const questions = [
    {
      name: "value",
      type: "input",
      message: isAttributeHash ? "Enter block hash" : "Enter block number",
      validate: function (value: string) {
        if (isAttributeHash) {
          if (typeof value !== "string") {
            return "Block hash must be a string";
          }
          if (value.length !== 66) {
            return "Block hash must have 66 characters";
          }
        } else {
          for(let i = 0;i<value.length;i++){
            let digit = parseInt(value[i]);
            if (Number.isNaN(digit)) {
              return "Block hash must be a number";
            }
          }
        }
        return true;
      },
    },
  ];
  return inquirer.prompt(questions);
};
