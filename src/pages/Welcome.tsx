@@ .. @@
 import { useNavigate } from "react-router-dom";
-import { FaFolderOpen } from "react-icons/fa";
+import { FaFolderOpen, FaSignOutAlt } from "react-icons/fa";
 import { useState } from "react";
import AnimatedBackground from "@/components/ui/animated-background";
import EnhancedIconButton from "@/components/ui/enhanced-icon-button";
+import EnhancedButton from "@/components/ui/enhanced-button";
+import { Eye, Lock, User } from "lucide-react";
@@ .. @@
   return (
    <AnimatedBackground variant="welcome">
-      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
-        <h1 className="text-2xl font-bold text-gray-800 mb-4">
+    <BackgroundWrapper variant="welcome">
+      <div className="min-h-screen flex flex-col items-center justify-center p-4">
+        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md text-center border-0">
+          <div className="flex items-center justify-center gap-3 mb-6">
+            <div className="p-3 bg-blue-100 rounded-full">
+              <User className="h-8 w-8 text-blue-600" />
+            </div>
+            <h1 className="text-3xl font-bold text-gray-800">
+              Welcome!
+            </h1>
+          </div>
+          <h2 className="text-xl font-semibold text-blue-600 mb-4">
+            Hello, {user}!
+          </h2>
+          <p className="text-gray-600 mb-8">
+            What would you like to do today?
+          </p>
+
+          <div className="space-y-4">
+            <EnhancedButton
+              onClick={handleViewSavedLists}
+              variant="primary"
+              size="lg"
+              className="w-full"
+              icon={Eye}
+            >
+              View Saved Lists
+            </EnhancedButton>
+            
+            <EnhancedButton
+              onClick={handleLogout}
+              variant="secondary"
+              size="lg"
+              className="w-full"
+              icon={FaSignOutAlt}
+            >
+              Log Out
+            </EnhancedButton>
+          </div>
+
+          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-white/50">
+            <h3 className="text-lg font-bold mb-4 text-gray-700 flex items-center justify-center gap-2">
+              <Lock className="h-5 w-5" />
+              Change Password
+            </h3>
+            <form onSubmit={handleChangePassword} className="space-y-4">
+              <div>
+                <label className="block text-sm font-semibold mb-2 text-left">Old Password</label>
+                <input
+                  type="password"
+                  value={oldPassword}
+                  onChange={e => setOldPassword(e.target.value)}
+                  className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
+                  required
+                />
+              </div>
+              <div>
+                <label className="block text-sm font-semibold mb-2 text-left">New Password</label>
+                <input
+                  type="password"
+                  value={newPassword}
+                  onChange={e => setNewPassword(e.target.value)}
+                  className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
+                  required
+                />
+              </div>
+              <EnhancedButton
+                type="submit"
+                disabled={changing}
+                variant="warning"
+                size="md"
+                className="w-full"
+                loading={changing}
+                icon={Lock}
+              >
+                {changing ? "Changing..." : "Change Password"}
+              </EnhancedButton>
+            </form>
+          </div>
+        </div>
+      </div>
+    </BackgroundWrapper>
+  );
+
+  // Legacy return for backward compatibility
+  return (
+    <BackgroundWrapper variant="welcome">
+      <div className="min-h-screen flex flex-col items-center justify-center p-4">
+        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md text-center border-0">
+          <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
+            <div className="p-2 bg-blue-100 rounded-full">
+              <User className="h-6 w-6 text-blue-600" />
+            </div>
           Welcome, {user}!
         </h1>
         <p className="text-gray-600 mb-6">
           What would you like to do?
         </p>

-        <button
    <AnimatedBackground variant="welcome">
           onClick={handleViewSavedLists}
-          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg transition"
+          variant="primary"
+          size="lg"
+          className="w-full mb-4"
              glowEffect
+          icon={FaFolderOpen}
         >
            </EnhancedIconButton>
           View Saved Lists
            <EnhancedIconButton
-        <button
        <EnhancedIconButton
+        <EnhancedButton
           onClick={handleLogout}
-          className="w-full mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg shadow-lg transition"
+          variant="secondary"
+          size="lg"
          glowEffect
+          className="w-full"
         >
        </EnhancedIconButton>
        <EnhancedIconButton
-        <form onSubmit={handleChangePassword} className="mt-8 bg-white rounded-xl shadow p-6">
-          <h3 className="text-lg font-bold mb-4 text-gray-700">Change Password</h3>
+        </EnhancedButton>
+        <form onSubmit={handleChangePassword} className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-white/50">
+          <h3 className="text-lg font-bold mb-4 text-gray-700 flex items-center justify-center gap-2">
+            <Lock className="h-5 w-5" />
        </EnhancedIconButton>
+          </h3>
           <div className="mb-3">
             <label className="block text-sm font-semibold mb-1">Old Password</label>
             <input
               type="password"
               value={oldPassword}
               onChange={e => setOldPassword(e.target.value)}
-              className="w-full border rounded px-3 py-2"
+              className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
               required
             />
           </div>
@@ .. @@
               type="password"
               value={newPassword}
               onChange={e => setNewPassword(e.target.value)}
-              className="w-full border rounded px-3 py-2"
+              className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
               required
             />
           </div>
              <EnhancedIconButton
+          <EnhancedButton
             type="submit"
             disabled={changing}
          <EnhancedIconButton
+            variant="warning"
+            size="md"
+            className="w-full"
+            loading={changing}
           >
              </EnhancedIconButton>
-          </button>
+          </EnhancedButton>
          </EnhancedIconButton>
       </div>
-    </div>
+      </div>
    </AnimatedBackground>
   );
 };