# Blockhouse Fullstack Intern Test

### **Run the Project**  
**Web App:**  
1. `git clone github.com/blackdante101/blockhouse-fullstack-intern-test`  
2. `cd project-folder`  
3. `npm install`  
4. `npm run dev` (starts Next.js dev server)  

**Mobile App (Expo):**  
1. `cd mobile`  
2. `npm install`  
3. `npx expo start` (scan QR code with Expo Go app)  

---

### **API Integration**  
- **Data Source:** CoinGecko API (`/coins/markets`)  
- **Fetching:**  
  - Auto-fetches crypto data on mount  
  - Manual refresh via button click  
  - Cached for 1 minute (no duplicate calls)  
- **Search:** Filters locally – no extra API requests  

---

### **State Management**  
**Why React Query?**  
- Handles API caching/retries automatically  
- No messy useEffect/useState chains  
- Built-in loading/error states  

**Local State:**  
- Search input uses `useState` (simple enough)  

---

### **Challenges & Solutions**  
1. **API Rate Limits**  
   - Added manual refresh button + error alerts  

2. **UI Jank During Loading**  
   - Added loading spinners + placeholder animations  

3. **Data Formatting**  
   - Created `formatCurrency` helper for prices  

4. **Mobile Responsiveness**  
   - Used Bootstrap grid + custom media queries  

--- 

**Why It Works:**  
Simple but powerful – React Query handles the heavy lifting, CoinGecko provides reliable data, and the clean UI focuses on what matters: real-time crypto prices.