# Cadenza Website - Development Guidelines

## Automated Code Quality Tools

This project uses several tools to catch errors automatically before they reach your code:

### 1. **Syntax Validation** (Custom)
```bash
npm run validate:syntax
```
Catches:
- ✅ Unbalanced CSS braces (catches the duplicate `}` error)
- ✅ Mismatched HTML tags
- ✅ Script tag mismatches

**This runs automatically on every commit via git pre-commit hook.**

### 2. **CSS Linting** (stylelint)
```bash
npm run lint:css
```
Catches:
- CSS syntax errors
- Invalid property values
- Selector issues

### 3. **JavaScript Linting** (ESLint)
```bash
npm run lint:js
```
Catches:
- Unused variables
- Syntax errors
- Undefined references

### 4. **HTML Validation** (html-validate)
```bash
npm run lint:html
```
Catches:
- Unclosed tags
- Invalid attributes
- Semantic issues

### 5. **Code Formatting** (Prettier)
```bash
npm run format
```
Auto-formats all HTML, CSS, and JavaScript to consistent style.

## Running All Checks

Run all validations at once:
```bash
npm run lint
```

Or the shorter version:
```bash
npm test
```

## Git Workflow

**Pre-commit Hook (Automatic)**
When you run `git commit`, the syntax validator runs automatically. If it finds errors, the commit will be blocked:

```
❌ style.css:
   Line 609: Unexpected closing brace - more closing braces than opening braces

Commit failed - fix syntax errors above.
```

This prevents broken code from being committed.

## How to Make Changes Safely

1. **Edit your files normally**
2. **Before committing**, run:
   ```bash
   npm run lint
   ```
3. **Fix any errors** that are reported
4. **Commit your changes** - the pre-commit hook will validate once more

## Configuration Files

- `.stylelintrc.json` - CSS linting rules
- `.eslintrc.json` - JavaScript linting rules  
- `.html-validaterc.json` - HTML validation rules
- `validate-syntax.js` - Custom syntax checker (catches brace mismatches)
- `.husky/pre-commit` - Git pre-commit hook configuration
- `package.json` - npm scripts and lint-staged config

## Common Issues & Fixes

### Issue: "Unexpected closing brace"
**Cause:** Extra `}` in CSS file
**Fix:** Find and remove the duplicate closing brace
```bash
npm run validate:syntax  # Find the line number
```

### Issue: "Unclosed brace"
**Cause:** Missing closing `}` in CSS file
**Fix:** Add the missing closing brace

### Issue: Linter complains about style but code works
**Solution:** Run `npm run format` to auto-fix formatting issues

### Issue: Pre-commit hook blocks my commit
**Solution:** 
1. Run `npm run validate:syntax` to see errors
2. Fix the errors in your editor
3. Try committing again

## Disabling Checks (Not Recommended)

If you absolutely need to bypass pre-commit checks:
```bash
git commit --no-verify
```

⚠️ **Only use this for emergency fixes** - these tools exist to catch bugs before they happen!

## Future Improvements

- Add TypeScript support
- Add GitHub Actions CI/CD to catch errors on PR
- Add automated accessibility testing
- Add performance testing

---

**Remember:** These tools are your friends - they catch mistakes automatically so you don't have to!
