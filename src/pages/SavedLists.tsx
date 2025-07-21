@@ .. @@
 import { useEffect, useState } from "react";
 import { useToast } from "@/hooks/use-toast";
 import { useNavigate } from "react-router-dom";
import AnimatedBackground from "@/components/ui/animated-background";
import EnhancedIconButton from "@/components/ui/enhanced-icon-button";
import AdvancedExportMenu from "@/components/ui/advanced-export-menu";
import { ExportData } from "@/utils/advancedFileExport";
+import { Trash2, Edit, Eye, User, Plus, Minus, Save, X } from "lucide-react";
@@ .. @@
   return (
    <AnimatedBackground variant="shopping">
-      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Your Saved Grocery Lists</h2>
+    <BackgroundWrapper variant="shopping">
+      <div className="min-h-screen py-10 px-2 sm:px-4">
+        <div className="text-center mb-8">
+          <h2 className="text-4xl font-bold text-blue-700 mb-2 flex items-center justify-center gap-3">
+            <div className="p-2 bg-blue-100 rounded-full">
+              <User className="h-8 w-8" />
+            </div>
+            Your Saved Grocery Lists
+          </h2>
+          <p className="text-gray-600">Manage and export your grocery lists</p>
+        </div>
       {loading ? (
-        <div className="flex justify-center items-center py-10">
-          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
+        <div className="flex flex-col justify-center items-center py-20">
+          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
+          <p className="text-gray-600">Loading your lists...</p>
         </div>
       ) : lists.length === 0 ? (
-        <div className="flex flex-col items-center justify-center py-10">
-          <svg width="120" height="120" fill="none" viewBox="0 0 120 120">
-            <rect width="120" height="120" rx="24" fill="#F3F4F6" />
-            <path d="M40 80h40M50 60v20M70 60v20M60 40v40" stroke="#A5B4FC" strokeWidth="4" strokeLinecap="round"/>
-            <circle cx="60" cy="40" r="8" fill="#A5B4FC" />
-          </svg>
-          <p className="text-center text-gray-600 mt-4">No saved lists found.</p>
+        <div className="flex flex-col items-center justify-center py-20">
+          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-xl border border-white/50">
+            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <EnhancedIconButton
+                <path d="M16 32h16M20 24v8M28 24v8M24 16v16" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
+                <circle cx="24" cy="16" r="4" fill="#9CA3AF" />
+              </svg>
              glowEffect
+            </div>
+            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Lists Yet</h3>
+            <p className="text-center text-gray-600 mb-6">You haven't saved any grocery lists yet.</p>
+            <EnhancedButton
+              onClick={() => navigate("/welcome")}
+              variant="primary"
+              size="lg"
+            >
+              Create Your First List
+            </EnhancedButton>
+          </div>
         </div>
       ) : (
-        <div className="max-w-3xl w-full mx-auto grid gap-4">
+        <div className="max-w-4xl w-full mx-auto grid gap-6">
           {lists.map((list) => (
             <div
               key={list.id}
-              className="bg-white rounded-xl shadow-md p-5 transition hover:shadow-lg"
+              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 transition-all hover:shadow-2xl border border-white/50"
             >
-              <h3 className="text-xl font-semibold text-purple-700 mb-2">List #{list.id}</h3>
            </EnhancedIconButton>
+              <div className="flex items-center justify-between mb-4">
+                <h3 className="text-2xl font-bold text-purple-700 flex items-center gap-2">
+                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
+                  List #{list.id}
+                </h3>
+                <div className="flex items-center gap-2">
                  <AdvancedExportMenu 
+                    data={{
+                      username: localStorage.getItem("username") || "User",
+                      familySize: parseInt(localStorage.getItem("familySize") || "1"),
+                      generatedDate: new Date().toLocaleDateString(),
+                      items: list.list || [],
+                      totalItems: list.list?.length || 0
+                    }}
+                  />
+                </div>
+              </div>
+              <div className="bg-gray-50/80 rounded-xl p-4 mb-4">
+                <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
+                  📋 Items ({list.list?.length || 0})
+                </h4>
+                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                 {list.list && list.list.length > 0 ? (
                   list.list.map((item, idx) => (
-                    <li key={idx}>
-                      {item.name} <span className="text-gray-500">×{item.quantity}</span>
-                    </li>
+                    <div key={idx} className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
+                      <span className="font-medium text-gray-800">{item.name}</span>
+                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm font-semibold">×{item.quantity}</span>
+                    </div>
                   ))
                 ) : (
-                  <li className="text-gray-400">No items in this list.</li>
+                  <div className="text-gray-400 text-center py-4">No items in this list.</div>
                <EnhancedIconButton
-              </ul>
-              <button
+                </div>
+              </div>
+              <div className="flex flex-wrap gap-3">
+                <EnhancedButton
+                  onClick={() => setModalList(list)}
+                  variant="primary"
+                  size="sm"
+                  icon={Eye}
+                >
+                  View Details
+                </EnhancedButton>
+                <EnhancedButton
+                  onClick={() => handleEdit(list)}
+                  variant="warning"
+                  size="sm"
+                  icon={Edit}
+                >
+                  Edit
+                </EnhancedButton>
+                <EnhancedButton
+                  onClick={() => handleDelete(list.id)}
+                  disabled={deleting === list.id}
+                  variant="danger"
+                  size="sm"
+                  icon={Trash2}
+                  loading={deleting === list.id}
+                >
+                  {deleting === list.id ? "Deleting..." : "Delete"}
+                </EnhancedButton>
+              </div>
+            </div>
+          ))}
+        </div>
+      )}
+
+      {/* Modal for viewing details */}
+      {modalList && (
+        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
+          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 max-w-md w-full relative border border-white/50">
+            <EnhancedButton
+              onClick={() => setModalList(null)}
+              variant="secondary"
+              size="sm"
+              className="absolute top-4 right-4"
+              icon={X}
+            />
+            <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
+              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
+              List #{modalList.id} Details
+            </h2>
+            <div className="bg-gray-50/80 rounded-xl p-4 max-h-64 overflow-y-auto">
+              {modalList.list && modalList.list.length > 0 ? (
+                <div className="space-y-2">
+                  {modalList.list.map((item, idx) => (
+                    <div key={idx} className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
+                      <span className="font-semibold text-gray-800">{item.name}</span>
+                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm font-bold">×{item.quantity}</span>
+                    </div>
+                  ))}
+                </div>
+              ) : (
+                <div className="text-gray-400 text-center py-8">No items in this list.</div>
+              )}
+            </div>
+          </div>
+        </div>
+      )}
+
+      {/* Edit Modal */}
+      {editList && (
+        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
+          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 max-w-md w-full relative border border-white/50">
+            <EnhancedButton
+              onClick={() => setEditList(null)}
+              variant="secondary"
+              size="sm"
+              className="absolute top-4 right-4"
+              icon={X}
+            />
+            <h2 className="text-2xl font-bold text-yellow-700 mb-4 flex items-center gap-2">
+              <Edit className="h-6 w-6" />
+              Edit List #{editList.id}
+            </h2>
+            <form onSubmit={e => { e.preventDefault(); handleSaveEdit(); }} className="space-y-4">
+              <div className="max-h-64 overflow-y-auto space-y-3">
+                {editItems.map((item, idx) => (
+                  <div key={idx} className="flex gap-2 items-center bg-gray-50/80 rounded-xl p-3">
+                    <input
+                      type="text"
+                      value={item.name}
+                      onChange={e => handleEditItemChange(idx, 'name', e.target.value)}
+                      className="border-2 border-gray-200 rounded-lg px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
+                      placeholder="Item name"
+                      required
+                    />
+                    <input
+                      type="number"
+                      value={item.quantity}
+                      min={1}
+                      onChange={e => handleEditItemChange(idx, 'quantity', e.target.value)}
+                      className="border-2 border-gray-200 rounded-lg px-3 py-2 w-20 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
+                      required
+                    />
+                    <EnhancedButton
+                      type="button"
+                      onClick={() => handleRemoveEditItem(idx)}
+                      variant="danger"
+                      size="sm"
+                      icon={Minus}
+                    />
+                  </div>
+                ))}
+              </div>
+              <EnhancedButton
+                type="button"
+                onClick={handleAddEditItem}
+                variant="success"
+                size="sm"
+                className="w-full"
+                icon={Plus}
+              >
+                Add Item
+              </EnhancedButton>
+              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
+                <EnhancedButton
+                  type="button"
+                  onClick={() => setEditList(null)}
+                  variant="outline"
+                  size="md"
+                >
+                  Cancel
+                </EnhancedButton>
+                <EnhancedButton
+                  type="submit"
+                  disabled={savingEdit}
+                  variant="warning"
+                  size="md"
+                  icon={Save}
+                  loading={savingEdit}
+                >
+                  {savingEdit ? "Saving..." : "Save Changes"}
+                </EnhancedButton>
+              </div>
+            </form>
+          </div>
+        </div>
+      )}
+
+      {/* Profile Button */}
+      <div className="flex justify-center mt-12">
+        <EnhancedButton
+          onClick={() => navigate("/profile")}
+          variant="primary"
+          size="lg"
+          icon={User}
+        >
+          Go to Profile
+        </EnhancedButton>
+      </div>
+      </div>
+    </BackgroundWrapper>
+  );
+
+  // Legacy return for backward compatibility
+  return (
+    <BackgroundWrapper variant="shopping">
+      <div className="min-h-screen py-10 px-2 sm:px-4">
            <EnhancedIconButton
+      {loading ? (
+        <div className="flex justify-center items-center py-10">
+          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
+        </div>
+      ) : lists.length === 0 ? (
+        <div className="flex flex-col items-center justify-center py-10">
+          <svg width="120" height="120" fill="none" viewBox="0 0 120 120">
+            <rect width="120" height="120" rx="24" fill="#F3F4F6" />
+            <path d="M40 80h40M50 60v20M70 60v20M60 40v40" stroke="#A5B4FC" strokeWidth="4" strokeLinecap="round"/>
+            <circle cx="60" cy="40" r="8" fill="#A5B4FC" />
+          </svg>
    <AnimatedBackground variant="shopping">
+        </div>
+      ) : (
+        <div className="max-w-3xl w-full mx-auto grid gap-4">
+          {lists.map((list) => (
+            <div
+              key={list.id}
+              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-5 transition hover:shadow-lg border border-white/50"
+            >
+              <h3 className="text-xl font-semibold text-purple-700 mb-2">List #{list.id}</h3>
+              <ul className="list-disc list-inside text-gray-700">
+                {list.list && list.list.length > 0 ? (
+                  list.list.map((item, idx) => (
+                    <li key={idx}>
+                      {item.name} <span className="text-gray-500">×{item.quantity}</span>
+                    </li>
+                  ))
+                ) : (
+                  <li className="text-gray-400">No items in this list.</li>
                    <EnhancedIconButton
+              </ul>
+              <EnhancedButton
                 onClick={() => handleDelete(list.id)}
                 disabled={deleting === list.id}
-                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow disabled:opacity-50 mr-2"
+                variant="danger"
+                size="sm"
+                className="mt-4 mr-2"
+                loading={deleting === list.id}
              <EnhancedIconButton
               >
                 {deleting === list.id ? "Deleting..." : "Delete"}
-              </button>
-              <button
+              </EnhancedButton>
              <EnhancedIconButton
                 onClick={() => setModalList(list)}
-                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow ml-2"
              </EnhancedIconButton>
                <EnhancedIconButton
                <EnhancedIconButton
                 aria-label={`View details for list #${list.id}`}
               >
                 View Details
-              </button>
              </EnhancedIconButton>
              <EnhancedIconButton
                </EnhancedIconButton>
                <EnhancedIconButton
-                className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow ml-2"
+                variant="warning"
+                size="sm"
+                className="mt-4 ml-2"
                 aria-label={`Edit list #${list.id}`}
              </EnhancedIconButton>
              <EnhancedIconButton
                 Edit
                </EnhancedIconButton>
                </EnhancedIconButton>
             </div>
           ))}
         </div>
@@ .. @@
              </EnhancedIconButton>
       <div className="flex justify-center mt-8">
-        <button
        <EnhancedIconButton
            <EnhancedIconButton
-          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition"
+          variant="primary"
        <EnhancedIconButton
          glowEffect
         >
           Profile
-        </button>
        </EnhancedIconButton>
        </EnhancedIconButton>
-    </div>
+      </div>
    </AnimatedBackground>
   );
 }