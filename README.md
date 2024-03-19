# INSTALL K6
- Download directly https://dl.k6.io/msi/k6-latest-amd64.msi

# INSTALL K6 TYPES 
- It helps hint the code when we type: `npm install --save-dev @types/k6`

# INTERPRETER ESLINT
- npm init
- npx eslint --init 

# EXECUTE K6 SCRIPTS
- `k6 run .\{file-scripts.js}`

# TESTING PAGE
- Check all pages in the website k6: https://test.k6.io/ and https://test-api.k6.io/

# DASHBOARD PAGE
- Create an free account on grafana
- Then cmd `k6 login cloud --token [your token]`
- Run with `k6 cloud .\scenarios\tc02_CRUD_operations.js`
- Open browser to see results on k6 dashboard: https://app.k6.io/tests/874856

# DEBUG
- See the response and request headers: `k6 run test.js --http-debug`
- Not just the response and request headers but also the request and response bodies: `k6 run test.js --http-debug=full`