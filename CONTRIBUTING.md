# Contributing to expressjs-field-validator

Thank you for your interest in contributing to **expressjs-field-validator**! This guide will help you get started, whether you're fixing a bug, adding a new validation rule, improving documentation, or anything in between.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Making Changes](#making-changes)
  - [Bug Fixes](#bug-fixes)
  - [New Validation Rules](#new-validation-rules)
  - [New Features](#new-features)
  - [Documentation](#documentation)
- [Coding Guidelines](#coding-guidelines)
- [Testing](#testing)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Reporting Issues](#reporting-issues)

---

## Code of Conduct

Please be respectful and constructive in all interactions. We welcome contributors of all experience levels and backgrounds. Harassment, discrimination, or hostile behaviour of any kind will not be tolerated.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

### Fork & Clone

1. [Fork the repository](https://github.com/gsmithun4/expressjs-field-validator/fork) on GitHub.
2. Clone your fork locally:

   ```bash
   git clone https://github.com/<your-username>/expressjs-field-validator.git
   cd expressjs-field-validator
   ```

3. Add the upstream remote so you can sync future changes:

   ```bash
   git remote add upstream https://github.com/gsmithun4/expressjs-field-validator.git
   ```

4. Install dependencies:

   ```bash
   npm install
   ```

---

## Project Structure

```
expressjs-field-validator/
├── .github/workflows/       # CI/CD GitHub Actions workflows
├── assets/                  # Screenshots and static assets
├── config-builder/          # Visual config builder tool source
├── example/                 # Example Express.js application
├── lib/                     # Core library source code
├── index.js                 # Main entry point
├── index.d.ts               # TypeScript type definitions
├── index.example.js         # Usage examples
├── .eslintrc.js             # ESLint configuration
└── package.json
```

Key files to be aware of:

- **`lib/`** — This is where the validation logic lives. Most bug fixes and new features will touch files here.
- **`index.js`** — The public API surface. New exports must be added here.
- **`index.d.ts`** — TypeScript definitions. Any new public API must be reflected here.

---

## Development Workflow

1. Sync your fork with the latest upstream changes before starting work:

   ```bash
   git fetch upstream
   git checkout master
   git merge upstream/master
   ```

2. Create a descriptive feature branch:

   ```bash
   git checkout -b feat/add-my-new-validator
   # or
   git checkout -b fix/fix-date-validation-bug
   ```

3. Make your changes (see [Making Changes](#making-changes) below).

4. Lint your code:

   ```bash
   npm run lint
   ```

5. Run the tests to make sure nothing is broken:

   ```bash
   npm test
   ```

6. Commit your changes following the [commit message guidelines](#commit-messages).

7. Push your branch and open a Pull Request.

---

## Making Changes

### Bug Fixes

- Identify the relevant file(s) in `lib/`.
- Add a test case that reproduces the bug **before** fixing it, so the test starts failing and then passes after your fix.
- Keep the fix minimal and focused — avoid unrelated refactoring in the same PR.

### New Validation Rules

New rules (e.g., `isIPAddress()`, `isCreditCard()`) should follow the existing fluent-API pattern:

1. Add the rule method to the appropriate file in `lib/`.
2. Ensure the method is chainable (returns `this`).
3. Add the corresponding error message/debug message.
4. Export it if necessary via `index.js`.
5. Add the TypeScript definition in `index.d.ts`.
6. Write tests covering:
   - Valid input passes
   - Invalid input fails with the correct error message
   - Edge cases (empty string, `null`, `undefined`)
7. Update `README.md` with a description of the new rule under the **Available Options** section.

### New Features

For larger features (e.g., new middleware types, new doc-generation options):

1. **Open an issue first** to discuss the design before writing code. This avoids wasted effort if the direction needs adjustment.
2. Follow the same patterns established in existing code.
3. Add appropriate tests.
4. Update all relevant documentation: `README.md`, `index.d.ts`, and any example files.

### Documentation

Documentation improvements are always welcome! This includes:

- Fixing typos or unclear wording in `README.md`
- Adding missing examples
- Improving TypeScript types
- Updating the `example/` application

For doc-only changes, a full test run is not required, but please still lint before submitting.

---

## Coding Guidelines

- **Style**: The project uses ESLint (see `.eslintrc.js`). Run `npm run lint` before committing. Do not disable lint rules without discussion.
- **No new dependencies**: This package prides itself on having **zero runtime dependencies**. Do not add external packages to `dependencies` in `package.json`. Dev dependencies for testing/tooling are acceptable.
- **Chainable API**: All field-definition methods must return `this` to preserve the fluent chain.
- **Backward compatibility**: Avoid breaking changes to the public API. If a breaking change is necessary, it must be discussed in an issue first and documented in the migration guide.
- **TypeScript types**: All public API additions must have corresponding type definitions in `index.d.ts`.

### Commit Messages

Use clear, conventional commit messages:

```
feat: add isIPAddress() validation rule
fix: correct date parsing for DD/MM/YYYY format
docs: add example for nested object validation
chore: update ESLint config
test: add edge cases for isMatching()
```

---

## Testing

All new code must be accompanied by tests. Please ensure:

- Tests cover the happy path, error cases, and boundary/edge cases.
- Existing tests continue to pass — do not delete or modify tests to make them pass unless the behaviour was intentionally changed.

Run tests with:

```bash
npm test
```

For coverage reporting (if configured):

```bash
npm run test:coverage
```

Code quality is also tracked via [SonarCloud](https://sonarcloud.io/dashboard?id=gsmithun4_expressjs-field-validator). Aim to keep code smells, duplication, and coverage metrics in a healthy state.

---

## Submitting a Pull Request

1. Ensure your branch is up to date with `upstream/master`.
2. Make sure `npm run lint` and `npm test` both pass.
3. Push your branch to your fork:

   ```bash
   git push origin feat/my-feature
   ```

4. Open a Pull Request against the `master` branch of the upstream repo.
5. Fill in the PR description with:
   - **What** the change does
   - **Why** it is needed (link to the related issue if applicable)
   - **How** to test it
   - Any **migration notes** for breaking changes
6. A maintainer will review your PR. Please respond to any feedback promptly and make requested changes in additional commits (squashing can happen at merge time).

---

## Reporting Issues

Found a bug or have a feature request? Please [open an issue](https://github.com/gsmithun4/expressjs-field-validator/issues) and include:

- **For bugs**: Node.js version, package version, a minimal reproducible code snippet, and the expected vs actual behaviour.
- **For feature requests**: A clear description of the use case and why the existing API doesn't cover it.

---

Thank you for helping make **expressjs-field-validator** better! 🎉
