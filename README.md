# Ambidex customer dashboard
Dashboard for customer that I created for Ambidex company. Created with Vite, using React, Typescript and SCSS.

Dashboard is a calendar function to help customers visualize the sequences/runs in their stores. It allows to block a time window (to block a run) in case there is planned service for their fridge/freeze system. Furthermore you can see upcoming events and all historical runs - what date,time and in which store they've been executed. 

There is also a functionality to get a personalized report of previous month with most important results which you can download or print directly from dashboard. 

Also a (unfinished) feature for chart/graph showing with real time data through connecting to a mqtt-broker. ![Screenshot 2025-05-09 140523](https://github.com/user-attachments/assets/4fa49645-3524-408e-9959-cc8209623409)
![Screenshot 2025-05-09 140454](https://github.com/user-attachments/assets/591b22a7-5572-4adc-a8e2-f130661344d0)
![Screenshot 2025-05-09 140547](https://github.com/user-attachments/assets/dbf7c774-445a-4bdc-8116-520f5712672d)
![Screenshot 2025-05-09 140630](https://github.com/user-attachments/assets/bfe060e5-d803-40c5-b5e1-644dc3e04437)
![Screenshot 2025-05-09 140510](https://github.com/user-attachments/assets/85474f25-ed80-40ee-916a-3f29daed15f6)
![Screenshot 2025-05-09 140739](https://github.com/user-attachments/assets/5478d7a3-c5ed-499c-9f4b-afb515dda533)
![Screenshot 2025-05-09 140650](https://github.com/user-attachments/assets/2f590132-8fee-44e3-a307-c2ecfb85517f)
![Screenshot 2025-05-09 140711](https://github.com/user-attachments/assets/9a8a11c7-1c0b-40cf-a463-61996ea908d4)
![Screenshot 2025-05-09 140705](https://github.com/user-attachments/assets/af33135f-7ce0-4d15-8c62-e5406b8d5a62)
![Screenshot 2025-05-09 140701](https://github.com/user-attachments/assets/d40d625d-1c99-4fc6-b5af-aaa0048c3f45)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
