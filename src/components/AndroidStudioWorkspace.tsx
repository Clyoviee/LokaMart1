import React, { useEffect, useMemo, useState } from 'react';
import {
  ANDROID_STUDIO_PROJECT_FILES,
  AndroidProjectFile,
  SCREEN_ANDROID_MAPPINGS,
  downloadAndroidStudioProjectZip,
} from '../androidStudioProjectData';
import { AddressItem, CartItem, Order, ScreenId, UserProfile } from '../data';
import { FIREBASE_PROJECT_INFO, FirestoreCollectionSnapshotCounts } from '../firebase';
import { RegisteredAccount } from './AuthScreens';

export interface LogcatEntry {
  id: string;
  time: string;
  tag: string;
  level: 'D' | 'I' | 'W';
  message: string;
}

interface AndroidStudioWorkspaceProps {
  currentScreen: ScreenId;
  onNavigateScreen: (screen: ScreenId) => void;
  firebaseUserEmail: string | null;
  firebaseUid: string | null;
  isFirestoreOnline: boolean;
  isSyncingFirestore: boolean;
  firestoreCounts: FirestoreCollectionSnapshotCounts;
  onConnectFirebaseGoogle: () => void;
  onSyncAllToFirestore: () => void;
  onDisconnectFirebase: () => void;
  registeredAccounts: RegisteredAccount[];
  cartItems: CartItem[];
  addresses: AddressItem[];
  orders: Order[];
  userProfile: UserProfile;
  logcatEntries: LogcatEntry[];
  onShowToast: (msg: string) => void;
}

export const AndroidStudioWorkspace: React.FC<AndroidStudioWorkspaceProps> = ({
  currentScreen,
  onNavigateScreen,
  firebaseUserEmail,
  firebaseUid,
  isFirestoreOnline,
  isSyncingFirestore,
  firestoreCounts,
  onConnectFirebaseGoogle,
  onSyncAllToFirestore,
  onDisconnectFirebase,
  registeredAccounts,
  cartItems,
  addresses,
  orders,
  userProfile,
  logcatEntries,
  onShowToast,
}) => {
  const mapping = SCREEN_ANDROID_MAPPINGS[currentScreen] || SCREEN_ANDROID_MAPPINGS.splash;

  const [selectedFilePath, setSelectedFilePath] = useState<string>(mapping.kotlinFile);
  const [autoFollowScreen, setAutoFollowScreen] = useState<boolean>(true);
  const [activeCodeType, setActiveCodeType] = useState<'kt' | 'xml' | 'repo' | 'gradle'>('kt');
  const [bottomTab, setBottomTab] = useState<'firestore' | 'logcat'>('firestore');
  const [showProjectTree, setShowProjectTree] = useState<boolean>(true);
  const [editableBuffers, setEditableBuffers] = useState<Record<string, string>>({});

  // Sync open file with current screen when autoFollowScreen is active
  useEffect(() => {
    if (!autoFollowScreen) return;
    const currentMap = SCREEN_ANDROID_MAPPINGS[currentScreen];
    if (!currentMap) return;
    if (activeCodeType === 'xml') {
      setSelectedFilePath(currentMap.xmlFile);
    } else if (activeCodeType === 'kt') {
      setSelectedFilePath(currentMap.kotlinFile);
    }
  }, [currentScreen, autoFollowScreen, activeCodeType]);

  const activeFile: AndroidProjectFile = useMemo(() => {
    return (
      ANDROID_STUDIO_PROJECT_FILES.find((f) => f.path === selectedFilePath) ||
      ANDROID_STUDIO_PROJECT_FILES[0]
    );
  }, [selectedFilePath]);

  const currentCodeContent = editableBuffers[activeFile.path] ?? activeFile.content;
  const codeLines = useMemo(() => currentCodeContent.split('\n'), [currentCodeContent]);

  const handleSelectFile = (file: AndroidProjectFile) => {
    setSelectedFilePath(file.path);
    if (file.language === 'xml' && file.folder === 'res/layout') {
      setActiveCodeType('xml');
    } else if (file.path.includes('FirebaseRepository.kt')) {
      setActiveCodeType('repo');
    } else if (file.language === 'gradle' || file.language === 'json') {
      setActiveCodeType('gradle');
    } else {
      setActiveCodeType('kt');
    }
    if (file.relatedScreen && file.relatedScreen !== currentScreen) {
      onNavigateScreen(file.relatedScreen);
    }
  };

  const handleSwitchQuickTab = (tab: 'kt' | 'xml' | 'repo' | 'gradle') => {
    setActiveCodeType(tab);
    const currentMap = SCREEN_ANDROID_MAPPINGS[currentScreen];
    if (tab === 'kt' && currentMap) {
      setSelectedFilePath(currentMap.kotlinFile);
    } else if (tab === 'xml' && currentMap) {
      setSelectedFilePath(currentMap.xmlFile);
    } else if (tab === 'repo') {
      setSelectedFilePath('app/src/main/java/id/ac/ikmi/lokamart/data/FirebaseRepository.kt');
    } else if (tab === 'gradle') {
      setSelectedFilePath('app/build.gradle.kts');
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(currentCodeContent);
    onShowToast(`Kode ${activeFile.fileName} berhasil disalin ke Clipboard!`);
  };

  const groupedTree = useMemo(() => {
    return {
      manifests: ANDROID_STUDIO_PROJECT_FILES.filter((f) => f.folder === 'manifest'),
      javaDataModel: ANDROID_STUDIO_PROJECT_FILES.filter(
        (f) => f.folder === 'java/data' || f.folder === 'java/model'
      ),
      javaUi: ANDROID_STUDIO_PROJECT_FILES.filter((f) => f.folder === 'java/ui'),
      resLayout: ANDROID_STUDIO_PROJECT_FILES.filter((f) => f.folder === 'res/layout'),
      resValuesMenu: ANDROID_STUDIO_PROJECT_FILES.filter(
        (f) => f.folder === 'res/values' || f.folder === 'res/menu'
      ),
      gradle: ANDROID_STUDIO_PROJECT_FILES.filter((f) => f.folder === 'gradle'),
    };
  }, []);

  return (
    <div className="flex flex-col flex-1 min-w-0 bg-[#1e1f22] text-[#dfe1e5] rounded-2xl overflow-hidden border border-[#393b40] shadow-2xl">
      {/* ===================================================================
          1. ANDROID STUDIO TOP IDE TOOLBAR
         =================================================================== */}
      <div className="bg-[#2b2d30] px-3.5 py-2.5 border-b border-[#393b40] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            type="button"
            onClick={() => setShowProjectTree((prev) => !prev)}
            className="px-2 py-1 rounded-md bg-[#393b40] hover:bg-[#4e5157] text-xs font-semibold flex items-center gap-1 text-[#dfe1e5] transition-colors"
            title="Tampilkan/Sembunyikan Project Tree Android Studio"
          >
            <span className="material-symbols-outlined text-[15px] text-[#3ddc84]">
              folder_code
            </span>
            <span className="hidden sm:inline">Project</span>
          </button>

          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3ddc84] shrink-0"></span>
            <span className="font-bold text-xs text-white truncate">
              Android Studio • id.ac.ikmi.lokamart
            </span>
            <span className="hidden xl:inline-block px-2 py-0.5 rounded bg-[#3ddc84]/15 text-[#3ddc84] text-[10px] font-mono font-bold border border-[#3ddc84]/30">
              Kotlin 2.0 + XML ViewBinding
            </span>
          </div>
        </div>

        {/* Active Screen Quick Switcher (.kt | .xml | FirebaseRepository.kt | build.gradle.kts) */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="flex items-center bg-[#1e1f22] p-0.5 rounded-lg border border-[#393b40]">
            <button
              type="button"
              onClick={() => handleSwitchQuickTab('kt')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold flex items-center gap-1 transition-all ${
                activeCodeType === 'kt'
                  ? 'bg-[#3574f0] text-white shadow-xs'
                  : 'text-[#9da0a8] hover:text-white'
              }`}
            >
              <span className="text-[#f8873c] font-extrabold">K</span>
              <span>{mapping.className}.kt</span>
            </button>
            <button
              type="button"
              onClick={() => handleSwitchQuickTab('xml')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold flex items-center gap-1 transition-all ${
                activeCodeType === 'xml'
                  ? 'bg-[#3574f0] text-white shadow-xs'
                  : 'text-[#9da0a8] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[13px] text-[#e09553]">code</span>
              <span>{mapping.xmlFile.split('/').pop()}</span>
            </button>
            <button
              type="button"
              onClick={() => handleSwitchQuickTab('repo')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold flex items-center gap-1 transition-all ${
                activeCodeType === 'repo'
                  ? 'bg-[#3574f0] text-white shadow-xs'
                  : 'text-[#9da0a8] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[13px] text-[#ffca28]">
                local_fire_department
              </span>
              <span className="hidden sm:inline">FirebaseRepository.kt</span>
              <span className="sm:hidden">Firebase.kt</span>
            </button>
            <button
              type="button"
              onClick={() => handleSwitchQuickTab('gradle')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold flex items-center gap-1 transition-all ${
                activeCodeType === 'gradle'
                  ? 'bg-[#3574f0] text-white shadow-xs'
                  : 'text-[#9da0a8] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[13px] text-[#3ddc84]">build</span>
              <span className="hidden md:inline">build.gradle.kts</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => downloadAndroidStudioProjectZip(onShowToast)}
            className="px-2.5 py-1 rounded-lg bg-[#3ddc84] hover:bg-[#32c673] text-[#041b3c] text-[11px] font-bold flex items-center gap-1 shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">download</span>
            <span>Download .ZIP</span>
          </button>
        </div>
      </div>

      {/* ===================================================================
          2. MIDDLE WORKSPACE: PROJECT TREE + CODE EDITOR (.KT & .XML)
         =================================================================== */}
      <div className="flex-1 flex min-h-[420px] max-h-[580px] overflow-hidden">
        {/* Left Tree: Android Studio Project View */}
        {showProjectTree && (
          <div className="w-60 shrink-0 bg-[#25262a] border-r border-[#393b40] flex flex-col overflow-y-auto no-scrollbar select-none text-xs">
            <div className="px-3 py-2 border-b border-[#393b40] flex items-center justify-between text-[11px] font-bold text-[#9da0a8]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#3ddc84]">
                  android
                </span>
                <span>app (Android View)</span>
              </span>
              <label className="flex items-center gap-1 cursor-pointer text-[10px] font-normal">
                <input
                  type="checkbox"
                  checked={autoFollowScreen}
                  onChange={(e) => setAutoFollowScreen(e.target.checked)}
                  className="accent-[#3574f0]"
                />
                <span>Auto-Sync</span>
              </label>
            </div>

            <div className="p-2 flex flex-col gap-2 font-mono text-[11px]">
              {/* manifests */}
              <div>
                <div className="px-1.5 py-1 text-[#9da0a8] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">folder</span>
                  <span>manifests</span>
                </div>
                {groupedTree.manifests.map((f) => (
                  <button
                    key={f.path}
                    type="button"
                    onClick={() => handleSelectFile(f)}
                    className={`w-full pl-5 pr-2 py-1 rounded text-left truncate flex items-center gap-1.5 ${
                      selectedFilePath === f.path
                        ? 'bg-[#2e436e] text-white font-bold'
                        : 'text-[#dfe1e5] hover:bg-[#313338]'
                    }`}
                  >
                    <span className="text-[#e09553] font-bold">&lt;/&gt;</span>
                    <span className="truncate">{f.fileName}</span>
                  </button>
                ))}
              </div>

              {/* kotlin+java (data & model) */}
              <div>
                <div className="px-1.5 py-1 text-[#9da0a8] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-[#3574f0]">
                    folder_special
                  </span>
                  <span className="truncate">java/id.ac.ikmi.lokamart.data</span>
                </div>
                {groupedTree.javaDataModel.map((f) => (
                  <button
                    key={f.path}
                    type="button"
                    onClick={() => handleSelectFile(f)}
                    className={`w-full pl-5 pr-2 py-1 rounded text-left truncate flex items-center gap-1.5 ${
                      selectedFilePath === f.path
                        ? 'bg-[#2e436e] text-white font-bold'
                        : 'text-[#dfe1e5] hover:bg-[#313338]'
                    }`}
                  >
                    <span className="text-[#f8873c] font-bold">K</span>
                    <span className="truncate">{f.fileName}</span>
                  </button>
                ))}
              </div>

              {/* kotlin+java (ui activities & fragments) */}
              <div>
                <div className="px-1.5 py-1 text-[#9da0a8] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-[#3574f0]">
                    folder_special
                  </span>
                  <span className="truncate">java/id.ac.ikmi.lokamart.ui</span>
                </div>
                {groupedTree.javaUi.map((f) => (
                  <button
                    key={f.path}
                    type="button"
                    onClick={() => handleSelectFile(f)}
                    className={`w-full pl-5 pr-2 py-1 rounded text-left truncate flex items-center justify-between gap-1 ${
                      selectedFilePath === f.path
                        ? 'bg-[#2e436e] text-white font-bold'
                        : 'text-[#dfe1e5] hover:bg-[#313338]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="text-[#f8873c] font-bold">K</span>
                      <span className="truncate">{f.fileName}</span>
                    </div>
                    {f.relatedScreen === currentScreen && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3ddc84] shrink-0"></span>
                    )}
                  </button>
                ))}
              </div>

              {/* res/layout (.xml) */}
              <div>
                <div className="px-1.5 py-1 text-[#9da0a8] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-[#e09553]">
                    folder
                  </span>
                  <span>res/layout (XML)</span>
                </div>
                {groupedTree.resLayout.map((f) => (
                  <button
                    key={f.path}
                    type="button"
                    onClick={() => handleSelectFile(f)}
                    className={`w-full pl-5 pr-2 py-1 rounded text-left truncate flex items-center justify-between gap-1 ${
                      selectedFilePath === f.path
                        ? 'bg-[#2e436e] text-white font-bold'
                        : 'text-[#dfe1e5] hover:bg-[#313338]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="text-[#e09553] font-bold">XML</span>
                      <span className="truncate">{f.fileName}</span>
                    </div>
                    {f.relatedScreen === currentScreen && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3ddc84] shrink-0"></span>
                    )}
                  </button>
                ))}
              </div>

              {/* res/values & menu */}
              <div>
                <div className="px-1.5 py-1 text-[#9da0a8] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">folder</span>
                  <span>res/values &amp; menu</span>
                </div>
                {groupedTree.resValuesMenu.map((f) => (
                  <button
                    key={f.path}
                    type="button"
                    onClick={() => handleSelectFile(f)}
                    className={`w-full pl-5 pr-2 py-1 rounded text-left truncate flex items-center gap-1.5 ${
                      selectedFilePath === f.path
                        ? 'bg-[#2e436e] text-white font-bold'
                        : 'text-[#dfe1e5] hover:bg-[#313338]'
                    }`}
                  >
                    <span className="text-[#e09553] font-bold">XML</span>
                    <span className="truncate">{f.fileName}</span>
                  </button>
                ))}
              </div>

              {/* Gradle Scripts */}
              <div>
                <div className="px-1.5 py-1 text-[#9da0a8] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-[#3ddc84]">
                    settings
                  </span>
                  <span>Gradle Scripts &amp; Firebase</span>
                </div>
                {groupedTree.gradle.map((f) => (
                  <button
                    key={f.path}
                    type="button"
                    onClick={() => handleSelectFile(f)}
                    className={`w-full pl-5 pr-2 py-1 rounded text-left truncate flex items-center gap-1.5 ${
                      selectedFilePath === f.path
                        ? 'bg-[#2e436e] text-white font-bold'
                        : 'text-[#dfe1e5] hover:bg-[#313338]'
                    }`}
                  >
                    <span className="text-[#3ddc84] font-bold">G</span>
                    <span className="truncate">{f.fileName}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Right Area: Code Editor with Line Numbers & Header Breadcrumb */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#1e1f22]">
          {/* File Tab Strip & Action Buttons */}
          <div className="bg-[#2b2d30] px-3 py-1.5 border-b border-[#393b40] flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-mono text-[11px] text-[#9da0a8] truncate">
                {activeFile.path}
              </span>
              <span className="hidden md:inline-block px-2 py-0.5 rounded bg-[#1e1f22] text-[#88c0d0] text-[10px] truncate">
                {activeFile.description}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={handleCopyCode}
                className="px-2.5 py-1 rounded bg-[#393b40] hover:bg-[#4e5157] text-white text-[11px] font-semibold flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">content_copy</span>
                <span>Salin Kode</span>
              </button>
            </div>
          </div>

          {/* Code Viewer & Editable Buffer */}
          <div className="flex-1 overflow-auto font-mono text-[12px] leading-[1.6] p-3 bg-[#1e1f22] text-[#dfe1e5] selection:bg-[#2e436e]">
            <table className="w-full border-collapse">
              <tbody>
                {codeLines.map((line, idx) => (
                  <tr key={idx} className="hover:bg-[#26282e]">
                    <td className="select-none pr-4 text-right text-[#6f737a] w-9 align-top">
                      {idx + 1}
                    </td>
                    <td className="whitespace-pre text-[#dfe1e5]">{line || ' '}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ===================================================================
          3. BOTTOM PANEL: FIREBASE CLOUD FIRESTORE DATABASE & LOGCAT
         =================================================================== */}
      <div className="bg-[#25262a] border-t border-[#393b40] flex flex-col">
        {/* Bottom Panel Tabs */}
        <div className="px-3 py-1.5 bg-[#2b2d30] border-b border-[#393b40] flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setBottomTab('firestore')}
              className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1.5 transition-colors ${
                bottomTab === 'firestore'
                  ? 'bg-[#ffca28]/20 text-[#ffca28] border border-[#ffca28]/40'
                  : 'text-[#9da0a8] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">database</span>
              <span>Firebase Cloud Firestore Inspector</span>
            </button>
            <button
              type="button"
              onClick={() => setBottomTab('logcat')}
              className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1.5 transition-colors ${
                bottomTab === 'logcat'
                  ? 'bg-[#3ddc84]/20 text-[#3ddc84] border border-[#3ddc84]/40'
                  : 'text-[#9da0a8] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">terminal</span>
              <span>Logcat ({logcatEntries.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#9da0a8] hidden sm:inline">
              Project: <strong className="text-white">{FIREBASE_PROJECT_INFO.projectId}</strong>
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                isFirestoreOnline
                  ? 'bg-[#3ddc84]/20 text-[#3ddc84]'
                  : 'bg-amber-500/20 text-amber-300'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              {isFirestoreOnline ? 'Firestore Connected' : 'Checking...'}
            </span>
          </div>
        </div>

        {/* Bottom Panel Content */}
        {bottomTab === 'firestore' ? (
          <div className="p-3 grid grid-cols-1 md:grid-cols-12 gap-3 items-center text-xs">
            {/* Auth & Cloud Sync Controls */}
            <div className="md:col-span-5 bg-[#1e1f22] p-3 rounded-xl border border-[#393b40] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#ffca28]">
                    cloud_sync
                  </span>
                  <span>Koneksi Firebase Auth &amp; Firestore</span>
                </span>
                <span className="text-[10px] font-mono text-[#9da0a8]">
                  Target: {mapping.firestoreCollection}
                </span>
              </div>

              {firebaseUid ? (
                <div className="flex flex-col gap-2">
                  <div className="text-[11px] text-[#9da0a8]">
                    Login sebagai:{' '}
                    <strong className="text-[#3ddc84]">{firebaseUserEmail || firebaseUid}</strong>
                    <div className="text-[10px] font-mono truncate">UID: {firebaseUid}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={isSyncingFirestore}
                      onClick={onSyncAllToFirestore}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-[#3574f0] hover:bg-[#2c65d8] text-white font-bold text-[11px] flex items-center justify-center gap-1 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px]">sync</span>
                      <span>
                        {isSyncingFirestore ? 'Menyinkronkan...' : 'Sync Data ke Firestore'}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={onDisconnectFirebase}
                      className="py-1.5 px-2.5 rounded-lg bg-[#393b40] hover:bg-[#4e5157] text-white text-[11px]"
                    >
                      Putuskan
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <p className="text-[11px] text-[#9da0a8]">
                    Hubungkan akun Google Anda untuk menyimpan &amp; menyinkronkan seluruh transaksi
                    LokaMart secara real-time ke koleksi Cloud Firestore (`/users/&#123;uid&#125;/*`).
                  </p>
                  <button
                    type="button"
                    onClick={onConnectFirebaseGoogle}
                    className="w-full py-2 px-3 rounded-lg bg-[#ffca28] hover:bg-[#ffd54f] text-[#041b3c] font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">login</span>
                    <span>Hubungkan Firebase Auth (Google) &amp; Sync Database</span>
                  </button>
                </div>
              )}
            </div>

            {/* Live Collection Counters */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="bg-[#1e1f22] p-2.5 rounded-xl border border-[#393b40] flex flex-col">
                <span className="text-[10px] font-mono text-[#9da0a8]">/accounts</span>
                <span className="text-lg font-extrabold text-white mt-0.5">
                  {firebaseUid ? firestoreCounts.accountsCount : registeredAccounts.length}
                </span>
                <span className="text-[10px] text-[#3ddc84]">Akun Mahasiswa</span>
              </div>
              <div className="bg-[#1e1f22] p-2.5 rounded-xl border border-[#393b40] flex flex-col">
                <span className="text-[10px] font-mono text-[#9da0a8]">/cart</span>
                <span className="text-lg font-extrabold text-white mt-0.5">
                  {firebaseUid ? firestoreCounts.cartCount : cartItems.length}
                </span>
                <span className="text-[10px] text-[#88c0d0]">Item Keranjang</span>
              </div>
              <div className="bg-[#1e1f22] p-2.5 rounded-xl border border-[#393b40] flex flex-col">
                <span className="text-[10px] font-mono text-[#9da0a8]">/addresses</span>
                <span className="text-lg font-extrabold text-white mt-0.5">
                  {firebaseUid ? firestoreCounts.addressesCount : addresses.length}
                </span>
                <span className="text-[10px] text-[#e09553]">Alamat Cirebon</span>
              </div>
              <div className="bg-[#1e1f22] p-2.5 rounded-xl border border-[#393b40] flex flex-col">
                <span className="text-[10px] font-mono text-[#9da0a8]">/orders</span>
                <span className="text-lg font-extrabold text-white mt-0.5">
                  {firebaseUid ? firestoreCounts.ordersCount : orders.length}
                </span>
                <span className="text-[10px] text-[#ffca28]">Transaksi Kriya</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-2.5 max-h-36 overflow-y-auto font-mono text-[11px] bg-[#1e1f22] flex flex-col gap-1">
            {logcatEntries.map((entry) => (
              <div key={entry.id} className="flex items-start gap-2 leading-snug">
                <span className="text-[#6f737a] shrink-0">{entry.time}</span>
                <span
                  className={`px-1 rounded text-[10px] font-bold shrink-0 ${
                    entry.level === 'I'
                      ? 'bg-[#3ddc84]/20 text-[#3ddc84]'
                      : entry.level === 'W'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-[#3574f0]/20 text-[#88c0d0]'
                  }`}
                >
                  {entry.level}/{entry.tag}
                </span>
                <span className="text-[#dfe1e5] break-all">{entry.message}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
