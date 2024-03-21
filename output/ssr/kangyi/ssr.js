module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "82330eb0aa65388292e3";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "kangyi";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(4)(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./node_modules/core-js/internals/a-function.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/a-function.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/an-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/an-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-for-each.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-for-each.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").forEach;
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "./node_modules/core-js/internals/array-method-is-strict.js");
var arrayMethodUsesToLength = __webpack_require__(/*! ../internals/array-method-uses-to-length */ "./node_modules/core-js/internals/array-method-uses-to-length.js");

var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
module.exports = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;


/***/ }),

/***/ "./node_modules/core-js/internals/array-includes.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-includes.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-iteration.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/array-iteration.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js/internals/array-species-create.js");

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-method-is-strict.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/array-method-is-strict.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-method-uses-to-length.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/array-method-uses-to-length.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

module.exports = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-species-create.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/array-species-create.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof-raw.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/classof-raw.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/classof.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js/internals/to-string-tag-support.js");
var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/copy-constructor-properties.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "./node_modules/core-js/internals/own-keys.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-non-enumerable-property.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/create-non-enumerable-property.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-property-descriptor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/descriptors.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/descriptors.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/document-create-element.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/document-create-element.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/internals/dom-iterables.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/dom-iterables.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "./node_modules/core-js/internals/enum-bug-keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "./node_modules/core-js/internals/export.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/export.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f;
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "./node_modules/core-js/internals/copy-constructor-properties.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/fails.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/internals/fails.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/function-bind-context.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/function-bind-context.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/function-bind.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/function-bind.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var slice = [].slice;
var factories = {};

var construct = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = slice.call(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = partArgs.concat(slice.call(arguments));
    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };
  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-built-in.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/get-built-in.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(/*! ../internals/path */ "./node_modules/core-js/internals/path.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "./node_modules/core-js/internals/global.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/global.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ "./node_modules/core-js/internals/has.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/has.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/core-js/internals/hidden-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/hidden-keys.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/internals/html.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/html.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "./node_modules/core-js/internals/ie8-dom-define.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/indexed-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/indexed-object.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "./node_modules/core-js/internals/inspect-source.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/inspect-source.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "./node_modules/core-js/internals/internal-state.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/internal-state.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ "./node_modules/core-js/internals/native-weak-map.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var objectHas = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var shared = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-array.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/is-array.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-forced.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-forced.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "./node_modules/core-js/internals/is-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-pure.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/is-pure.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/internals/native-symbol.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/native-symbol.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),

/***/ "./node_modules/core-js/internals/native-weak-map.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/native-weak-map.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "./node_modules/core-js/internals/object-create.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/object-create.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var defineProperties = __webpack_require__(/*! ../internals/object-define-properties */ "./node_modules/core-js/internals/object-define-properties.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");
var html = __webpack_require__(/*! ../internals/html */ "./node_modules/core-js/internals/html.js");
var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-define-properties.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-properties.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-define-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-property.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-descriptor.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-names.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-symbols.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/internals/object-keys-internal.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var indexOf = __webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js").indexOf;
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-property-is-enumerable.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/internals/object-to-string.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/object-to-string.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js/internals/to-string-tag-support.js");
var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ "./node_modules/core-js/internals/own-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/own-keys.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "./node_modules/core-js/internals/path.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/path.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

module.exports = global;


/***/ }),

/***/ "./node_modules/core-js/internals/redefine.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/redefine.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var state;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) {
      createNonEnumerableProperty(value, 'name', key);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-flags.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-flags.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/require-object-coercible.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/set-global.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/set-global.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared-key.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/shared-key.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared-store.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/shared-store.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "./node_modules/core-js/internals/shared.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/shared.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.7.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/internals/to-absolute-index.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-indexed-object.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-integer.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/to-integer.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-length.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-length.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-primitive.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/to-primitive.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-string-tag-support.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/to-string-tag-support.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "./node_modules/core-js/internals/uid.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/uid.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "./node_modules/core-js/internals/use-symbol-as-uid.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/use-symbol-as-uid.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "./node_modules/core-js/internals/well-known-symbol.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "./node_modules/core-js/internals/use-symbol-as-uid.js");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.for-each.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.for-each.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var forEach = __webpack_require__(/*! ../internals/array-for-each */ "./node_modules/core-js/internals/array-for-each.js");

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.object.keys.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.keys.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var nativeKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.object.to-string.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.to-string.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js/internals/to-string-tag-support.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var toString = __webpack_require__(/*! ../internals/object-to-string */ "./node_modules/core-js/internals/object-to-string.js");

// `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ "./node_modules/core-js/modules/es.reflect.construct.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es.reflect.construct.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var bind = __webpack_require__(/*! ../internals/function-bind */ "./node_modules/core-js/internals/function-bind.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var nativeConstruct = getBuiltIn('Reflect', 'construct');

// `Reflect.construct` method
// https://tc39.github.io/ecma262/#sec-reflect.construct
// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  nativeConstruct(function () { /* empty */ });
});
var FORCED = NEW_TARGET_BUG || ARGS_BUG;

$({ target: 'Reflect', stat: true, forced: FORCED, sham: FORCED }, {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.regexp.to-string.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es.regexp.to-string.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var flags = __webpack_require__(/*! ../internals/regexp-flags */ "./node_modules/core-js/internals/regexp-flags.js");

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}


/***/ }),

/***/ "./node_modules/core-js/modules/web.dom-collections.for-each.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom-collections.for-each.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ "./node_modules/core-js/internals/dom-iterables.js");
var forEach = __webpack_require__(/*! ../internals/array-for-each */ "./node_modules/core-js/internals/array-for-each.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}


/***/ }),

/***/ "./node_modules/san-hot-loader/lib/runtime/component-client-api.js":
/*!*************************************************************************!*\
  !*** ./node_modules/san-hot-loader/lib/runtime/component-client-api.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file component-client-api.js
 * @author clark-t
 */

var utils = __webpack_require__(/*! ./utils */ "./node_modules/san-hot-loader/lib/runtime/utils.js");

var San;
var map = {};
var compatible;

global.__SAN_HOT_MAP__ = map;

function install(san) {
    if (compatible == null) {
        San = utils.esm(san);
        var versions = San.version.split('.');
        compatible = +versions[0] > 3 || +versions[1] > 8 || +versions[2] > 0;

    }

    if (!compatible) {
        throw new Error(
            '[HMR] You are using a version of san-hot-loader that is '
            + 'only compatible with san.js ^3.8.1'
        );
    }
}

function createRecord(id, ComponentClass) {
    var desc = makeComponentHot(id, ComponentClass);
    map[id] = {
        Ctor: desc.Ctor,
        proto: desc.proto,
        instances: []
    };
}

var SAN_HOOK_ORIGIN = '__SAN_HOOK_ORIGIN__';

function injectHook(options, name, callback) {
    var existing = options[name];
    // 防止多次热更新之后出现套娃
    if (existing && existing[SAN_HOOK_ORIGIN]) {
        return;
    }

    options[name] = existing
        ? function () {
            existing.call(this);
            callback.call(this);
        }
        : callback;

    options[name][SAN_HOOK_ORIGIN] = true;
}

function makeComponentHot(id, ComponentClass) {
    ComponentClass = utils.esm(ComponentClass);

    var proto;
    var Ctor;

    if (typeof ComponentClass === 'function') {
        proto = ComponentClass.prototype;
        Ctor = ComponentClass;
    }
    else {
        proto = ComponentClass;
        Ctor = San.defineComponent(proto);
    }

    injectHook(proto, 'attached', function () {
        map[id].instances.push(this);
    });
    injectHook(proto, 'detached', function () {
        var instances = map[id].instances;
        instances.splice(instances.indexOf(this), 1);
    });

    return {
        proto: proto,
        Ctor: Ctor
    };
}

function hotReload(id, ComponentClass) {
    var newDesc = makeComponentHot(id, ComponentClass);
    var recDesc = map[id];

    var recANode;
    var recCmptReady;
    var newANode;
    var newCmptReady;

    // 热更新新旧组件构造函数相同的例子如下：
    // import template from './template.html'；
    // import ComponentClass from './app';
    // ComponentClass.template = template;
    // export default ComponentClass;
    //
    // 在单纯修改 template 的时候，热更新时新旧组件指向都是 ComponentClass 的地址，在这种情况下，需要采用特殊手段将 ComponentClass 的 template 和对应的 aNode 更新掉
    if (!isProtoChange(newDesc, recDesc)) {
        recANode = recDesc.proto.aNode;
        recCmptReady = recDesc.proto._cmptReady;
    }

    recDesc.Ctor = newDesc.Ctor;
    recDesc.proto = newDesc.proto;

    recDesc.instances.slice().forEach(function (instance) {
        var parentEl = instance.el.parentElement;
        var beforeEl = instance.el.nextElementSibling;
        var options = {
            subTag: instance.subTag,
            owner: instance.owner,
            scope: instance.scope,
            parent: instance.parent,
            source: instance.source
        };

        var newInstance;

        if (recANode != null) {
            recDesc.proto.aNode = recANode;
            recDesc.proto._cmptReady = recCmptReady;

            instance.dispose();

            if (newANode == null) {
                delete newDesc.proto.aNode;
                delete newDesc.proto._cmptReady;
            }
            else {
                newDesc.proto.aNode = newANode;
                newDesc.proto._cmptReady = newCmptReady;
            }

            newInstance = new newDesc.Ctor(options);
            newInstance.attach(parentEl, beforeEl);

            if (newANode == null) {
                newANode = newDesc.proto.aNode;
                newCmptReady = newDesc.proto._cmptReady;
            }
        }
        else {
            instance.dispose();
            newInstance = new newDesc.Ctor(options);
            newInstance.attach(parentEl, beforeEl);
            // 将父节点当中缓存的子组件实例给手动替换掉
            // 不然父组件往子组件里绑定的数据就不再变化了
            if (instance.parent) {
                instance.parentComponent.constructor.prototype.components[instance.subTag] = newDesc.Ctor;
                var parent = instance.parent;
                parent.children.splice(parent.children.indexOf(instance), 1, newInstance);
            }
        }

    });
}

function isProtoChange(newDesc, recDesc) {
    if (recDesc.Ctor === newDesc.Ctor) {
        return false;
    }

    var recProto = recDesc.proto;
    var newProto = newDesc.proto;

    if (recProto.constructor === newProto.constructor && recProto.constructor != null) {
        return false;
    }

    return true;
}

module.exports = {
    install: install,
    createRecord: createRecord,
    hotReload: hotReload,
    compatible: compatible
};



/***/ }),

/***/ "./node_modules/san-hot-loader/lib/runtime/utils.js":
/*!**********************************************************!*\
  !*** ./node_modules/san-hot-loader/lib/runtime/utils.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file runtime utils
 * @author clark-t
 */

function esm(obj) {
    return obj.__esModule ? obj.default : obj;
}

function getExports(mod) {
    return esm(mod.exports || Object.getPrototypeOf(mod).exports);
}

module.exports = {
    esm: esm,
    getExports: getExports
};



/***/ }),

/***/ "./node_modules/san-store/dist/san-store.source.js":
/*!*********************************************************!*\
  !*** ./node_modules/san-store/dist/san-store.source.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.default = emitDevtool;

var _sanDevtool = __webpack_require__(4);

var _sanDevtool2 = _interopRequireDefault(_sanDevtool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function emitDevtool() {
   _sanDevtool2.default.apply(null, arguments);
} /**
   * san-store
   * Copyright 2017 Baidu Inc. All rights reserved.
   *
   * @file Devtool emitter entry
   * @author luyuan
   */

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * san-store
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2017 Baidu Inc. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @file store class
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author errorrik
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _flattenDiff = __webpack_require__(5);

var _flattenDiff2 = _interopRequireDefault(_flattenDiff);

var _parseName = __webpack_require__(2);

var _parseName2 = _interopRequireDefault(_parseName);

var _emitter = __webpack_require__(0);

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 唯一id的起始值
 *
 * @inner
 * @type {number}
 */
var guidIndex = 1;

/**
 * 获取唯一id
 *
 * @inner
 * @return {string} 唯一id
 */
var guid = function guid() {
    return (++guidIndex).toString();
};

/**
 * Store 类，应用程序状态数据的容器
 *
 * @class
 */

var Store = function () {
    /**
     * 构造函数
     *
     * @param {Object?} options 初始化参数
     * @param {Object?} options.initData 容器的初始化数据
     * @param {Object?} options.actions 容器的action函数集合
     * @param {boolean?} options.log 是否记录日志
     */
    function Store() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$initData = _ref.initData,
            initData = _ref$initData === undefined ? {} : _ref$initData,
            _ref$actions = _ref.actions,
            actions = _ref$actions === undefined ? {} : _ref$actions,
            _ref$log = _ref.log,
            log = _ref$log === undefined ? true : _ref$log,
            name = _ref.name;

        _classCallCheck(this, Store);

        this.raw = initData;
        this.actions = actions;
        this.log = log;
        this.name = name;

        this.listeners = [];
        this.stateChangeLogs = [];
        this.actionCtrl = new ActionControl(this);
    }

    /**
     * 获取 state
     *
     * @param {string} name state名称
     * @return {*}
     */


    _createClass(Store, [{
        key: 'getState',
        value: function getState(name) {
            name = (0, _parseName2.default)(name);

            var value = this.raw;
            for (var i = 0, l = name.length; value != null && i < l; i++) {
                value = value[name[i]];
            }

            return value;
        }

        /**
         * 监听 store 数据变化
         *
         * @param {Function} listener 监听器函数，接收diff对象
         */

    }, {
        key: 'listen',
        value: function listen(listener) {
            if (typeof listener === 'function') {
                this.listeners.push(listener);
            }
            // Alternatives for not receiving the events including default store
            // info from connector.
            (0, _emitter2.default)('store-listened', {
                store: this,
                listener: listener
            });
        }

        /**
         * 移除 store 数据变化监听器
         *
         * @param {Function} listener 监听器函数
         */

    }, {
        key: 'unlisten',
        value: function unlisten(listener) {
            var len = this.listeners.length;
            while (len--) {
                if (this.listeners[len] === listener) {
                    this.listeners.splice(len, 1);
                }
            }
            // Alternatives for not receiving the events including default store
            // info from connector.
            (0, _emitter2.default)('store-unlistened', {
                store: this,
                listener: listener
            });
        }

        /**
         * 触发 store 数据变化
         *
         * @private
         * @param {Array} diff 数据变更信息对象
         */

    }, {
        key: '_fire',
        value: function _fire(diff) {
            var _this = this;

            this.listeners.forEach(function (listener) {
                listener.call(_this, diff);
            });
        }

        /**
         * 添加一个 action
         *
         * @param {string} name action的名称
         * @param {Function} action action函数
         */

    }, {
        key: 'addAction',
        value: function addAction(name, action) {
            if (typeof action !== 'function') {
                return;
            }

            if (this.actions[name]) {
                throw new Error('Action ' + name + ' exists!');
            }

            this.actions[name] = action;

            (0, _emitter2.default)('store-action-added', { store: this, action: action });
        }

        /**
         * action 的 dispatch 入口
         *
         * @param {string} name action名称
         * @param {*} payload payload
         */

    }, {
        key: 'dispatch',
        value: function dispatch(name, payload) {
            this._dispatch(name, payload);
        }

        /**
         * action 的 dispatch 入口
         *
         * @private
         * @param {string} name action名称
         * @param {*} payload payload
         * @param {string} parentId 所属父action的id
         */

    }, {
        key: '_dispatch',
        value: function _dispatch(name, payload, parentId) {
            var _this2 = this;

            var action = this.actions[name];
            var actionId = guid();

            if (typeof action !== 'function') {
                return;
            }

            this.actionCtrl.start(actionId, name, payload, parentId);

            var context = {
                getState: function getState(name) {
                    return _this2.getState(name);
                },
                dispatch: function dispatch(name, payload) {
                    return _this2._dispatch(name, payload, actionId);
                }
            };
            var actionReturn = action.call(this, payload, context);

            var updateInfo = void 0;
            if (actionReturn) {
                if (typeof actionReturn.then === 'function') {
                    actionReturn.then(function () {
                        _this2.actionCtrl.done(actionId);
                    });
                    return;
                }

                if (typeof actionReturn.buildWithDiff === 'function') {
                    var oldValue = this.raw;
                    updateInfo = actionReturn.buildWithDiff()(oldValue);
                    updateInfo[1] = (0, _flattenDiff2.default)(updateInfo[1]);
                    this.raw = updateInfo[0];

                    if (this.log) {
                        this.stateChangeLogs.push({
                            oldValue: oldValue,
                            newValue: updateInfo[0],
                            diff: updateInfo[1],
                            id: actionId
                        });
                    }
                }
            }

            this.actionCtrl.done(actionId);

            if (updateInfo) {
                this._fire(updateInfo[1]);
            }
            (0, _emitter2.default)('store-dispatched', {
                store: this,
                diff: updateInfo ? updateInfo[1] : null,
                name: name,
                payload: payload,
                actionId: actionId,
                parentId: parentId
            });
        }
    }]);

    return Store;
}();

/**
 * Action 控制类，用于 Store 控制 Action 运行过程
 *
 * @class
 */


exports.default = Store;

var ActionControl = function () {
    /**
     * 构造函数
     *
     * @param {Store} store 所属的store实例
     */
    function ActionControl(store) {
        _classCallCheck(this, ActionControl);

        this.list = [];
        this.len = 0;
        this.index = {};
        this.store = store;
    }

    /**
     * 开始运行 action
     *
     * @param {string} id action的id
     * @param {string} name action 名称
     * @param {*} payload payload
     * @param {string?} parentId 父action的id
     */


    _createClass(ActionControl, [{
        key: 'start',
        value: function start(id, name, payload, parentId) {
            var actionInfo = {
                id: id,
                name: name,
                parentId: parentId,
                childs: []
            };

            if (this.store.log) {
                actionInfo.startTime = new Date().getTime();
                actionInfo.payload = payload;
            }

            this.list[this.len] = actionInfo;
            this.index[id] = this.len++;

            if (parentId) {
                this.getById(parentId).childs.push(id);
            }
        }

        /**
         * action 运行完成
         *
         * @param {string} id action的id
         * @param {Function?} updateBuilder 状态更新函数生成器
         */

    }, {
        key: 'done',
        value: function done(id) {
            this.getById(id).selfDone = true;
            this.detectDone(id);
        }

        /**
         * 探测 action 是否完全运行完成，只有子 action 都运行完成才算运行完成
         *
         * @param {string} id action的id
         */

    }, {
        key: 'detectDone',
        value: function detectDone(id) {
            var _this3 = this;

            var actionInfo = this.getById(id);
            var childsDone = true;
            actionInfo.childs.forEach(function (child) {
                childsDone = _this3.getById(child).done && childsDone;
            });

            if (childsDone && actionInfo.selfDone) {
                actionInfo.done = true;

                if (this.store.log) {
                    actionInfo.endTime = new Date().getTime();
                }

                if (actionInfo.parentId) {
                    this.detectDone(actionInfo.parentId);
                }
            }
        }
    }, {
        key: 'getById',
        value: function getById(id) {
            return this.list[this.index[id]];
        }
    }]);

    return ActionControl;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = parseName;
/**
 * san-store
 * Copyright 2017 Baidu Inc. All rights reserved.
 *
 * @file 解析数据属性名
 * @author errorrik
 */

/**
 * 解析数据属性名，返回数组形式的 terms
 *
 * @param {string} source 数据属性的字符串形式
 * @return {Array}
 */
function parseName(source) {
    if (source instanceof Array) {
        return source;
    }

    if (typeof source !== 'string') {
        return [];
    }

    // 这个简易的非状态机的实现是有缺陷的
    // 比如 a['dd.cc'].b 这种就有问题了，不过我们不考虑这种场景
    var terms = source.split('.');
    var result = [];

    for (var i = 0, l = terms.length; i < l; i++) {
        var term = terms[i];
        var propAccessorStart = term.indexOf('[');

        if (propAccessorStart >= 0) {
            if (propAccessorStart > 0) {
                result.push(term.slice(0, propAccessorStart));
                term = term.slice(propAccessorStart);
            }

            while (term.charCodeAt(0) === 91) {
                var propAccessorEnd = term.indexOf(']');
                if (propAccessorEnd < 0) {
                    throw new Error('name syntax error: ' + source);
                }

                var propAccessorLiteral = term.slice(1, propAccessorEnd);
                if (/^[0-9]+$/.test(propAccessorLiteral)) {
                    // for number
                    result.push(+propAccessorLiteral);
                } else if (/^(['"])([^\1]+)\1$/.test(propAccessorLiteral)) {
                    // for string literal
                    result.push(new Function('return ' + propAccessorLiteral)());
                }

                term = term.slice(propAccessorEnd + 1);
            }
        } else {
            result.push(term);
        }
    }

    return result;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * san-store
                                                                                                                                                                                                                                                                               * Copyright 2017 Baidu Inc. All rights reserved.
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * @file san组件的connect
                                                                                                                                                                                                                                                                               * @author errorrik
                                                                                                                                                                                                                                                                               */

exports.default = createConnector;

var _parseName = __webpack_require__(2);

var _parseName2 = _interopRequireDefault(_parseName);

var _store = __webpack_require__(1);

var _store2 = _interopRequireDefault(_store);

var _emitter = __webpack_require__(0);

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * san组件的connect
 *
 * @param {Object} mapStates 状态到组件数据的映射信息
 * @param {Object|Array?} mapActions store的action操作到组件actions方法的映射信息
 * @param {Store} store 指定的store实例
 * @return {function(ComponentClass)}
 */
function connect(mapStates, mapActions, store) {
    var mapStateInfo = [];

    for (var key in mapStates) {
        if (mapStates.hasOwnProperty(key)) {
            var mapState = mapStates[key];
            var mapInfo = { dataName: key };

            switch (typeof mapState === 'undefined' ? 'undefined' : _typeof(mapState)) {
                case 'string':
                    mapInfo.stateName = (0, _parseName2.default)(mapState);
                    break;

                case 'function':
                    mapInfo.getter = mapState;
                    break;

                default:
                    mapInfo = null;
                    break;
            }

            mapInfo && mapStateInfo.push(mapInfo);
        }
    }

    (0, _emitter2.default)('store-connected', {
        mapStates: mapStates,
        mapActions: mapActions,
        store: store
    });

    return function (ComponentClass) {
        var componentProto = void 0;

        switch (typeof ComponentClass === 'undefined' ? 'undefined' : _typeof(ComponentClass)) {
            case 'function':
                componentProto = ComponentClass.prototype;
                break;
            case 'object':
                componentProto = ComponentClass;
                break;
        }

        if (!componentProto) {
            return;
        }

        // map states
        var inited = componentProto.inited;
        componentProto.inited = function () {
            var _this = this;

            // init data
            mapStateInfo.forEach(function (info) {
                if (typeof info.getter === 'function') {
                    _this.data.set(info.dataName, info.getter(store.getState()));
                } else {
                    _this.data.set(info.dataName, clone(store.getState(info.stateName)));
                }
            });

            // listen store change
            this._storeListener = function (diff) {
                mapStateInfo.forEach(function (info) {
                    if (typeof info.getter === 'function') {
                        _this.data.set(info.dataName, info.getter(store.getState()));
                        return;
                    }

                    var updateInfo = calcUpdateInfo(info, diff);
                    if (updateInfo) {
                        if (updateInfo.spliceArgs) {
                            _this.data.splice(updateInfo.componentData, updateInfo.spliceArgs);
                        } else {
                            _this.data.set(updateInfo.componentData, clone(store.getState(updateInfo.storeData)));
                        }
                    }
                });
            };
            store.listen(this._storeListener);

            (0, _emitter2.default)('store-comp-inited', {
                mapStates: mapStates,
                mapActions: mapActions,
                store: store,
                component: this
            });

            if (typeof inited === 'function') {
                inited.call(this);
            }
        };

        var disposed = componentProto.disposed;
        componentProto.disposed = function () {
            store.unlisten(this._storeListener);
            this._storeListener = null;

            (0, _emitter2.default)('store-comp-disposed', {
                mapStates: mapStates,
                mapActions: mapActions,
                store: store,
                component: this
            });

            if (typeof disposed === 'function') {
                disposed.call(this);
            }
        };

        // map actions
        if (!componentProto.actions) {
            componentProto.actions = {};

            if (mapActions instanceof Array) {
                mapActions.forEach(function (actionName) {
                    componentProto.actions[actionName] = function (payload) {
                        store.dispatch(actionName, payload);
                    };
                });
            } else {
                var _loop = function _loop(_key) {
                    var actionName = mapActions[_key];
                    componentProto.actions[_key] = function (payload) {
                        store.dispatch(actionName, payload);
                    };
                };

                for (var _key in mapActions) {
                    _loop(_key);
                }
            }
        }

        return ComponentClass;
    };
}

function clone(source) {
    if (source == null) {
        return source;
    }

    if ((typeof source === 'undefined' ? 'undefined' : _typeof(source)) === 'object') {
        if (source instanceof Array) {
            return source.map(function (item) {
                return clone(item);
            });
        } else if (source instanceof Date) {
            return new Date(source.getTime());
        }

        var result = {};
        for (var key in source) {
            result[key] = clone(source[key]);
        }

        return result;
    }

    return source;
}

/**
 * 判断 connect 的 state 是否需要更新
 *
 * @param {Object} info state的connect信息对象
 * @param {Array} diff 数据变更的diff信息
 * @return {boolean}
 */
function calcUpdateInfo(info, diff) {
    if (info.stateName) {
        var stateNameLen = info.stateName.length;

        for (var i = 0, diffLen = diff.length; i < diffLen; i++) {
            var diffInfo = diff[i];
            var target = diffInfo.target;
            var matchThisDiff = true;
            var j = 0;
            var targetLen = target.length;

            for (; j < targetLen && j < stateNameLen; j++) {
                if (info.stateName[j] != target[j]) {
                    matchThisDiff = false;
                    break;
                }
            }

            if (matchThisDiff) {
                var updateInfo = {
                    componentData: info.dataName,
                    storeData: info.stateName
                };

                if (targetLen > stateNameLen) {
                    updateInfo.storeData = target;
                    updateInfo.componentData += '.' + target.slice(stateNameLen).join('.');
                }

                if (targetLen >= stateNameLen && diffInfo.splice) {
                    updateInfo.spliceArgs = [diffInfo.splice.index, diffInfo.splice.deleteCount];

                    if (diffInfo.splice.insertions instanceof Array) {
                        updateInfo.spliceArgs.push.apply(updateInfo.spliceArgs, diffInfo.splice.insertions);
                    }
                }

                return updateInfo;
            }
        }
    }
}

/**
 * createConnector 创建连接
 *
 * @param {Store} store store实例
 * @return {Function}
 */
function createConnector(store) {
    if (store instanceof _store2.default) {
        return function (mapStates, mapActions) {
            return connect(mapStates, mapActions, store);
        };
    }

    throw new Error(store + ' must be an instance of Store!');
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = emitDevtool;
/**
 * san-store
 * Copyright 2017 Baidu Inc. All rights reserved.
 *
 * @file San Devtool emitter
 * @author luyuan
 */

var isBrowser = typeof window !== 'undefined';

function emitDevtool(name, args) {
    if (isBrowser && window['__san_devtool__']) {
        window['__san_devtool__'].emit(name, args);
    }
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = flattenDiff;
/**
 * san-store
 * Copyright 2017 Baidu Inc. All rights reserved.
 *
 * @file 把 san-update 给予的 diff 对象扁平化成数组
 * @author errorrik
 */

/**
 * 把 san-update 给予的 diff 对象扁平化成数组
 *
 * @param {Object} diff diff 对象
 * @return {Array}
 */
function flattenDiff(diff) {
    var flatDiff = [];
    var pos = [];

    function readDiffObject(source) {
        if (source.$change) {
            source.target = pos.slice(0);
            flatDiff.push(source);
            return;
        }

        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                pos.push(key);
                readDiffObject(source[key]);
                pos.pop();
            }
        }
    }

    readDiffObject(diff);
    return flatDiff;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = exports.Store = exports.version = exports.store = undefined;

var _store = __webpack_require__(1);

var _store2 = _interopRequireDefault(_store);

var _createConnector = __webpack_require__(3);

var _createConnector2 = _interopRequireDefault(_createConnector);

var _emitter = __webpack_require__(0);

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 默认的全局 Store 实例
 * 通常我们认为在一个应用应该具有一个全局唯一的 store，管理整个应用状态
 *
 * @type {Store}
 */
var store = exports.store = new _store2.default({ name: '__default__' });

// Alternatives for not receiving the events including default store info from
// connector.
/**
 * san-store
 * Copyright 2017 Baidu Inc. All rights reserved.
 *
 * @file 主模块
 * @author errorrik
 */

(0, _emitter2.default)('store-default-inited', { store: store });

/**
 * 版本号
 *
 * @type {string}
 */
var version = exports.version = '1.1.0';

exports.Store = _store2.default;
var connect = exports.connect = {
  san: (0, _createConnector2.default)(store),
  createConnector: _createConnector2.default
};

/***/ })
/******/ ]);
});

/***/ }),

/***/ "./node_modules/san/dist/san.spa.dev.js":
/*!**********************************************!*\
  !*** ./node_modules/san/dist/san.spa.dev.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file San 主文件
 */

(function (root) {
    // 人工调整打包代码顺序，通过注释手工写一些依赖
//     // require('./util/guid');
//     // require('./util/empty');
//     // require('./util/extend');
//     // require('./util/inherits');
//     // require('./util/each');
//     // require('./util/contains');
//     // require('./util/bind');
//     // require('./browser/on');
//     // require('./browser/un');
//     // require('./browser/svg-tags');
//     // require('./browser/create-el');
//     // require('./browser/remove-el');
//     // require('./util/next-tick');
//     // require('./browser/ie');
//     // require('./browser/ie-old-than-9');
//     // require('./browser/input-event-compatible');
//     // require('./browser/auto-close-tags');
//     // require('./util/data-types.js');
//     // require('./util/create-data-types-checker.js');
//     // require('./parser/walker');
//     // require('./parser/parse-template');
//     // require('./runtime/change-expr-compare');
//     // require('./runtime/data-change-type');
//     // require('./runtime/default-filters');
//     // require('./view/life-cycle');
//     // require('./view/node-type');
//     // require('./view/get-prop-handler');
//     // require('./view/is-data-change-by-element');
//     // require('./view/get-event-listener');
//     // require('./view/create-node');


    /**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 唯一id
 */


/**
 * 获取唯一id
 *
 * @type {number} 唯一id
 */
var guid = 1;

// exports = module.exports = guid;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 空函数
 */


/**
 * 啥都不干
 */
function empty() {}

// exports = module.exports = empty;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 属性拷贝
 */

/**
 * 对象属性拷贝
 *
 * @param {Object} target 目标对象
 * @param {Object} source 源对象
 * @return {Object} 返回目标对象
 */
function extend(target, source) {
    for (var key in source) {
        /* istanbul ignore else  */
        if (source.hasOwnProperty(key)) {
            var value = source[key];
            if (typeof value !== 'undefined') {
                target[key] = value;
            }
        }
    }

    return target;
}

// exports = module.exports = extend;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 构建类之间的继承关系
 */

// var extend = require('./extend');

/**
 * 构建类之间的继承关系
 *
 * @param {Function} subClass 子类函数
 * @param {Function} superClass 父类函数
 */
function inherits(subClass, superClass) {
    /* jshint -W054 */
    var subClassProto = subClass.prototype;
    var F = new Function();
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
    extend(subClass.prototype, subClassProto);
    /* jshint +W054 */
}

// exports = module.exports = inherits;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 遍历数组
 */


/**
 * 遍历数组集合
 *
 * @param {Array} array 数组源
 * @param {function(Any,number):boolean} iterator 遍历函数
 */
function each(array, iterator) {
    if (array && array.length > 0) {
        for (var i = 0, l = array.length; i < l; i++) {
            if (iterator(array[i], i) === false) {
                break;
            }
        }
    }
}

// exports = module.exports = each;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 判断数组中是否包含某项
 */

// var each = require('./each');

/**
 * 判断数组中是否包含某项
 *
 * @param {Array} array 数组
 * @param {*} value 包含的项
 * @return {boolean}
 */
function contains(array, value) {
    var result = false;
    each(array, function (item) {
        result = item === value;
        return !result;
    });

    return result;
}

// exports = module.exports = contains;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file bind函数
 */

/**
 * Function.prototype.bind 方法的兼容性封装
 *
 * @param {Function} func 要bind的函数
 * @param {Object} thisArg this指向对象
 * @param {...*} args 预设的初始参数
 * @return {Function}
 */
function bind(func, thisArg) {
    var nativeBind = Function.prototype.bind;
    var slice = Array.prototype.slice;
    // #[begin] allua
    if (nativeBind && func.bind === nativeBind) {
    // #[end]
        return nativeBind.apply(func, slice.call(arguments, 1));
    // #[begin] allua
    }

    /* istanbul ignore next */
    var args = slice.call(arguments, 2);
    /* istanbul ignore next */
    return function () {
        return func.apply(thisArg, args.concat(slice.call(arguments)));
    };
    // #[end]
}

// exports = module.exports = bind;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file DOM 事件挂载
 */

/**
 * DOM 事件挂载
 *
 * @inner
 * @param {HTMLElement} el DOM元素
 * @param {string} eventName 事件名
 * @param {Function} listener 监听函数
 * @param {boolean} capture 是否是捕获阶段
 */
function on(el, eventName, listener, capture) {
    // #[begin] allua
    /* istanbul ignore else */
    if (el.addEventListener) {
    // #[end]
        el.addEventListener(eventName, listener, capture);
    // #[begin] allua
    }
    else {
        el.attachEvent('on' + eventName, listener);
    }
    // #[end]
}

// exports = module.exports = on;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file DOM 事件卸载
 */

/**
 * DOM 事件卸载
 *
 * @inner
 * @param {HTMLElement} el DOM元素
 * @param {string} eventName 事件名
 * @param {Function} listener 监听函数
 * @param {boolean} capture 是否是捕获阶段
 */
function un(el, eventName, listener, capture) {
    // #[begin] allua
    /* istanbul ignore else */
    if (el.addEventListener) {
    // #[end]
        el.removeEventListener(eventName, listener, capture);
    // #[begin] allua
    }
    else {
        el.detachEvent('on' + eventName, listener);
    }
    // #[end]
}

// exports = module.exports = un;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 将字符串逗号切分返回对象
 */

// var each = require('../util/each');

/**
 * 将字符串逗号切分返回对象
 *
 * @param {string} source 源字符串
 * @return {Object}
 */
function splitStr2Obj(source) {
    var result = {};
    each(
        source.split(','),
        function (key) {
            result[key] = key;
        }
    );
    return result;
}

// exports = module.exports = splitStr2Obj;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file SVG标签表
 */

// var splitStr2Obj = require('../util/split-str-2-obj');

/**
 * svgTags
 *
 * @see https://www.w3.org/TR/SVG/svgdtd.html 只取常用
 * @type {Object}
 */
var svgTags = splitStr2Obj(''
    // structure
    + 'svg,g,defs,desc,metadata,symbol,use,'
    // image & shape
    + 'image,path,rect,circle,line,ellipse,polyline,polygon,'
    // text
    + 'text,tspan,tref,textpath,'
    // other
    + 'marker,pattern,clippath,mask,filter,cursor,view,animate,'
    // font
    + 'font,font-face,glyph,missing-glyph,'
    // camel
    + 'animateColor,animateMotion,animateTransform,textPath,foreignObject'
);

// exports = module.exports = svgTags;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file DOM创建
 */

// var svgTags = require('./svg-tags');

/**
 * 创建 DOM 元素
 *
 * @param  {string} tagName tagName
 * @return {HTMLElement}
 */
function createEl(tagName) {
    if (svgTags[tagName] && document.createElementNS) {
        return document.createElementNS('http://www.w3.org/2000/svg', tagName);
    }

    return document.createElement(tagName);
}

// exports = module.exports = createEl;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 移除DOM
 */

/**
 * 将 DOM 从页面中移除
 *
 * @param {HTMLElement} el DOM元素
 */
function removeEl(el) {
    if (el && el.parentNode) {
        el.parentNode.removeChild(el);
    }
}

// exports = module.exports = removeEl;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 在下一个时间周期运行任务
 */

// 该方法参照了vue2.5.0的实现，感谢vue团队
// SEE: https://github.com/vuejs/vue/blob/0948d999f2fddf9f90991956493f976273c5da1f/src/core/util/env.js#L68


// var bind = require('./bind');

/**
 * 下一个周期要执行的任务列表
 *
 * @inner
 * @type {Array}
 */
var nextTasks = [];

/**
 * 执行下一个周期任务的函数
 *
 * @inner
 * @type {Function}
 */
var nextHandler;

/**
 * 浏览器是否支持原生Promise
 * 对Promise做判断，是为了禁用一些不严谨的Promise的polyfill
 *
 * @inner
 * @type {boolean}
 */
var isNativePromise = typeof Promise === 'function' && /native code/.test(Promise);

/**
 * 在下一个时间周期运行任务
 *
 * @inner
 * @param {Function} fn 要运行的任务函数
 * @param {Object=} thisArg this指向对象
 */
function nextTick(fn, thisArg) {
    if (thisArg) {
        fn = bind(fn, thisArg);
    }
    nextTasks.push(fn);

    if (nextHandler) {
        return;
    }

    nextHandler = function () {
        var tasks = nextTasks.slice(0);
        nextTasks = [];
        nextHandler = null;

        for (var i = 0, l = tasks.length; i < l; i++) {
            tasks[i]();
        }
    };

    // 非标准方法，但是此方法非常吻合要求。
    /* istanbul ignore next */
    if (typeof setImmediate === 'function') {
        setImmediate(nextHandler);
    }
    // 用MessageChannel去做setImmediate的polyfill
    // 原理是将新的message事件加入到原有的dom events之后
    else if (typeof MessageChannel === 'function') {
        var channel = new MessageChannel();
        var port = channel.port2;
        channel.port1.onmessage = nextHandler;
        port.postMessage(1);
    }
    // for native app
    else if (isNativePromise) {
        Promise.resolve().then(nextHandler);
    }
    else {
        setTimeout(nextHandler, 0);
    }
}

// exports = module.exports = nextTick;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file ie版本号
 */

// #[begin] allua
/**
 * 从userAgent中ie版本号的匹配信息
 *
 * @type {Array}
 */
var ieVersionMatch = typeof navigator !== 'undefined'
    && navigator.userAgent.match(/(msie|trident)(\s*|\/)([0-9]+)/i);

/**
 * ie版本号，非ie时为0
 *
 * @type {number}
 */
var ie = ieVersionMatch ? /* istanbul ignore next */ ieVersionMatch[3] - 0 : 0;
if (ie && !/msie/i.test(ieVersionMatch[1])) {
    ie += 4;
}
// #[end]

// exports = module.exports = ie;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 是否 IE 并且小于 9
 */

// var ie = require('./ie');

// HACK:
// 1. IE8下，设置innerHTML时如果以html comment开头，comment会被自动滤掉
//    为了保证stump存在，需要设置完html后，createComment并appendChild/insertBefore
// 2. IE8下，innerHTML还不支持custom element，所以需要用div替代，不用createElement
// 3. 虽然IE8已经优化了字符串+连接，碎片化连接性能不再退化
//    但是由于上面多个兼容场景都用 < 9 判断，所以字符串连接也沿用
//    所以结果是IE8下字符串连接用的是数组join的方式

// #[begin] allua
/**
 * 是否 IE 并且小于 9
 */
var ieOldThan9 = ie && /* istanbul ignore next */ ie < 9;
// #[end]

// exports = module.exports = ieOldThan9;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 触发元素事件
 */

/**
 * 触发元素事件
 *
 * @inner
 * @param {HTMLElement} el DOM元素
 * @param {string} eventName 事件名
 */
function trigger(el, eventName) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(eventName, true, true);
    el.dispatchEvent(event);
}

// exports = module.exports = trigger;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解决 IE9 在表单元素中删除字符时不触发事件的问题
 */

// var ie = require('./ie');
// var on = require('./on');
// var trigger = require('./trigger');

// #[begin] allua
/* istanbul ignore if */
if (ie === 9) {
    on(document, 'selectionchange', function () {
        var el = document.activeElement;
        if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
            trigger(el, 'input');
        }
    });
}
// #[end]


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 自闭合标签表
 */

// var splitStr2Obj = require('../util/split-str-2-obj');

/**
 * 自闭合标签列表
 *
 * @type {Object}
 */
var autoCloseTags = splitStr2Obj('area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr');

// exports = module.exports = autoCloseTags;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file data types
 */

// var bind = require('./bind');
// var empty = require('./empty');
// var extend = require('./extend');

// #[begin] error
var ANONYMOUS_CLASS_NAME = '<<anonymous>>';

/**
 * 获取精确的类型
 *
 * @NOTE 如果 obj 是一个 DOMElement，我们会返回 `element`；
 *
 * @param  {*} obj 目标
 * @return {string}
 */
function getDataType(obj) {
    // 不支持element了。data应该是纯数据
    // if (obj && obj.nodeType === 1) {
    //     return 'element';
    // }

    return Object.prototype.toString
        .call(obj)
        .slice(8, -1)
        .toLowerCase();
}
// #[end]

/**
 * 创建链式的数据类型校验器
 *
 * @param  {Function} validate 真正的校验器
 * @return {Function}
 */
function createChainableChecker(validate) {
    /* istanbul ignore next */
    var chainedChecker = function () {};
    chainedChecker.isRequired = empty;

    // 只在 error 功能启用时才有实际上的 dataTypes 检测
    // #[begin] error
    validate = validate || empty;
    var checkType = function (isRequired, data, dataName, componentName, fullDataName) {

        var dataValue = data[dataName];
        var dataType = getDataType(dataValue);

        /* istanbul ignore next */
        componentName = componentName || ANONYMOUS_CLASS_NAME;

        // 如果是 null 或 undefined，那么要提前返回啦
        if (dataValue == null) {
            // 是 required 就报错
            if (isRequired) {
                throw new Error('[SAN ERROR] '
                    + 'The `' + dataName + '` '
                    + 'is marked as required in `' + componentName + '`, '
                    + 'but its value is ' + dataType
                );
            }
            // 不是 required，那就是 ok 的
            return;
        }

        validate(data, dataName, componentName, fullDataName);

    };

    chainedChecker = bind(checkType, null, false);
    chainedChecker.isRequired = bind(checkType, null, true);
    // #[end]

    return chainedChecker;

}

// #[begin] error
/**
 * 生成主要类型数据校验器
 *
 * @param  {string} type 主类型
 * @return {Function}
 */
function createPrimaryTypeChecker(type) {

    return createChainableChecker(function (data, dataName, componentName, fullDataName) {

        var dataValue = data[dataName];
        var dataType = getDataType(dataValue);

        if (dataType !== type) {
            throw new Error('[SAN ERROR] '
                + 'Invalid ' + componentName + ' data `' + fullDataName + '` of type'
                + '(' + dataType + ' supplied to ' + componentName + ', '
                + 'expected ' + type + ')'
            );
        }

    });

}



/**
 * 生成 arrayOf 校验器
 *
 * @param  {Function} arrayItemChecker 数组中每项数据的校验器
 * @return {Function}
 */
function createArrayOfChecker(arrayItemChecker) {

    return createChainableChecker(function (data, dataName, componentName, fullDataName) {

        if (typeof arrayItemChecker !== 'function') {
            throw new Error('[SAN ERROR] '
                + 'Data `' + dataName + '` of `' + componentName + '` has invalid '
                + 'DataType notation inside `arrayOf`, expected `function`'
            );
        }

        var dataValue = data[dataName];
        var dataType = getDataType(dataValue);

        if (dataType !== 'array') {
            throw new Error('[SAN ERROR] '
                + 'Invalid ' + componentName + ' data `' + fullDataName + '` of type'
                + '(' + dataType + ' supplied to ' + componentName + ', '
                + 'expected array)'
            );
        }

        for (var i = 0, len = dataValue.length; i < len; i++) {
            arrayItemChecker(dataValue, i, componentName, fullDataName + '[' + i + ']');
        }

    });

}

/**
 * 生成 instanceOf 检测器
 *
 * @param  {Function|Class} expectedClass 期待的类
 * @return {Function}
 */
function createInstanceOfChecker(expectedClass) {

    return createChainableChecker(function (data, dataName, componentName, fullDataName) {

        var dataValue = data[dataName];

        if (dataValue instanceof expectedClass) {
            return;
        }

        var dataValueClassName = dataValue.constructor && dataValue.constructor.name
            ? dataValue.constructor.name
            : /* istanbul ignore next */ ANONYMOUS_CLASS_NAME;

        /* istanbul ignore next */
        var expectedClassName = expectedClass.name || ANONYMOUS_CLASS_NAME;

        throw new Error('[SAN ERROR] '
            + 'Invalid ' + componentName + ' data `' + fullDataName + '` of type'
            + '(' + dataValueClassName + ' supplied to ' + componentName + ', '
            + 'expected instance of ' + expectedClassName + ')'
        );


    });

}

/**
 * 生成 shape 校验器
 *
 * @param  {Object} shapeTypes shape 校验规则
 * @return {Function}
 */
function createShapeChecker(shapeTypes) {

    return createChainableChecker(function (data, dataName, componentName, fullDataName) {

        if (getDataType(shapeTypes) !== 'object') {
            throw new Error('[SAN ERROR] '
                + 'Data `' + fullDataName + '` of `' + componentName + '` has invalid '
                + 'DataType notation inside `shape`, expected `object`'
            );
        }

        var dataValue = data[dataName];
        var dataType = getDataType(dataValue);

        if (dataType !== 'object') {
            throw new Error('[SAN ERROR] '
                + 'Invalid ' + componentName + ' data `' + fullDataName + '` of type'
                + '(' + dataType + ' supplied to ' + componentName + ', '
                + 'expected object)'
            );
        }

        for (var shapeKeyName in shapeTypes) {
            /* istanbul ignore else  */
            if (shapeTypes.hasOwnProperty(shapeKeyName)) {
                var checker = shapeTypes[shapeKeyName];
                if (typeof checker === 'function') {
                    checker(dataValue, shapeKeyName, componentName, fullDataName + '.' + shapeKeyName);
                }
            }
        }

    });

}

/**
 * 生成 oneOf 校验器
 *
 * @param  {Array} expectedEnumValues 期待的枚举值
 * @return {Function}
 */
function createOneOfChecker(expectedEnumValues) {

    return createChainableChecker(function (data, dataName, componentName, fullDataName) {

        if (getDataType(expectedEnumValues) !== 'array') {
            throw new Error('[SAN ERROR] '
                + 'Data `' + fullDataName + '` of `' + componentName + '` has invalid '
                + 'DataType notation inside `oneOf`, array is expected.'
            );
        }

        var dataValue = data[dataName];

        for (var i = 0, len = expectedEnumValues.length; i < len; i++) {
            if (dataValue === expectedEnumValues[i]) {
                return;
            }
        }

        throw new Error('[SAN ERROR] '
            + 'Invalid ' + componentName + ' data `' + fullDataName + '` of value'
            + '(`' + dataValue + '` supplied to ' + componentName + ', '
            + 'expected one of ' + expectedEnumValues.join(',') + ')'
        );

    });

}

/**
 * 生成 oneOfType 校验器
 *
 * @param  {Array<Function>} expectedEnumOfTypeValues 期待的枚举类型
 * @return {Function}
 */
function createOneOfTypeChecker(expectedEnumOfTypeValues) {

    return createChainableChecker(function (data, dataName, componentName, fullDataName) {

        if (getDataType(expectedEnumOfTypeValues) !== 'array') {
            throw new Error('[SAN ERROR] '
                + 'Data `' + dataName + '` of `' + componentName + '` has invalid '
                + 'DataType notation inside `oneOf`, array is expected.'
            );
        }

        var dataValue = data[dataName];

        for (var i = 0, len = expectedEnumOfTypeValues.length; i < len; i++) {

            var checker = expectedEnumOfTypeValues[i];

            if (typeof checker !== 'function') {
                continue;
            }

            try {
                checker(data, dataName, componentName, fullDataName);
                // 如果 checker 完成校验没报错，那就返回了
                return;
            }
            catch (e) {
                // 如果有错误，那么应该把错误吞掉
            }

        }

        // 所有的可接受 type 都失败了，才丢一个异常
        throw new Error('[SAN ERROR] '
            + 'Invalid ' + componentName + ' data `' + dataName + '` of value'
            + '(`' + dataValue + '` supplied to ' + componentName + ')'
        );

    });

}

/**
 * 生成 objectOf 校验器
 *
 * @param  {Function} typeChecker 对象属性值校验器
 * @return {Function}
 */
function createObjectOfChecker(typeChecker) {

    return createChainableChecker(function (data, dataName, componentName, fullDataName) {

        if (typeof typeChecker !== 'function') {
            throw new Error('[SAN ERROR] '
                + 'Data `' + dataName + '` of `' + componentName + '` has invalid '
                + 'DataType notation inside `objectOf`, expected function'
            );
        }

        var dataValue = data[dataName];
        var dataType = getDataType(dataValue);

        if (dataType !== 'object') {
            throw new Error('[SAN ERROR] '
                + 'Invalid ' + componentName + ' data `' + dataName + '` of type'
                + '(' + dataType + ' supplied to ' + componentName + ', '
                + 'expected object)'
            );
        }

        for (var dataKeyName in dataValue) {
            /* istanbul ignore else  */
            if (dataValue.hasOwnProperty(dataKeyName)) {
                typeChecker(
                    dataValue,
                    dataKeyName,
                    componentName,
                    fullDataName + '.' + dataKeyName
                );
            }
        }


    });

}

/**
 * 生成 exact 校验器
 *
 * @param  {Object} shapeTypes object 形态定义
 * @return {Function}
 */
function createExactChecker(shapeTypes) {

    return createChainableChecker(function (data, dataName, componentName, fullDataName, secret) {

        if (getDataType(shapeTypes) !== 'object') {
            throw new Error('[SAN ERROR] '
                + 'Data `' + dataName + '` of `' + componentName + '` has invalid '
                + 'DataType notation inside `exact`'
            );
        }

        var dataValue = data[dataName];
        var dataValueType = getDataType(dataValue);

        if (dataValueType !== 'object') {
            throw new Error('[SAN ERROR] '
                + 'Invalid data `' + fullDataName + '` of type `' + dataValueType + '`'
                + '(supplied to ' + componentName + ', expected `object`)'
            );
        }

        var allKeys = {};

        // 先合入 shapeTypes
        extend(allKeys, shapeTypes);
        // 再合入 dataValue
        extend(allKeys, dataValue);
        // 保证 allKeys 的类型正确

        for (var key in allKeys) {
            /* istanbul ignore else  */
            if (allKeys.hasOwnProperty(key)) {
                var checker = shapeTypes[key];

                // dataValue 中有一个多余的数据项
                if (!checker) {
                    throw new Error('[SAN ERROR] '
                        + 'Invalid data `' + fullDataName + '` key `' + key + '` '
                        + 'supplied to `' + componentName + '`. '
                        + '(`' + key + '` is not defined in `DataTypes.exact`)'
                    );
                }

                if (!(key in dataValue)) {
                    throw new Error('[SAN ERROR] '
                        + 'Invalid data `' + fullDataName + '` key `' + key + '` '
                        + 'supplied to `' + componentName + '`. '
                        + '(`' + key + '` is marked `required` in `DataTypes.exact`)'
                    );
                }

                checker(
                    dataValue,
                    key,
                    componentName,
                    fullDataName + '.' + key,
                    secret
                );

            }
        }

    });

}
// #[end]



/* eslint-disable fecs-valid-var-jsdoc */
var DataTypes = {
    array: createChainableChecker(),
    object: createChainableChecker(),
    func: createChainableChecker(),
    string: createChainableChecker(),
    number: createChainableChecker(),
    bool: createChainableChecker(),
    symbol: createChainableChecker(),
    any: createChainableChecker,
    arrayOf: createChainableChecker,
    instanceOf: createChainableChecker,
    shape: createChainableChecker,
    oneOf: createChainableChecker,
    oneOfType: createChainableChecker,
    objectOf: createChainableChecker,
    exact: createChainableChecker
};

// #[begin] error
DataTypes = {

    any: createChainableChecker(),

    // 类型检测
    array: createPrimaryTypeChecker('array'),
    object: createPrimaryTypeChecker('object'),
    func: createPrimaryTypeChecker('function'),
    string: createPrimaryTypeChecker('string'),
    number: createPrimaryTypeChecker('number'),
    bool: createPrimaryTypeChecker('boolean'),
    symbol: createPrimaryTypeChecker('symbol'),

    // 复合类型检测
    arrayOf: createArrayOfChecker,
    instanceOf: createInstanceOfChecker,
    shape: createShapeChecker,
    oneOf: createOneOfChecker,
    oneOfType: createOneOfTypeChecker,
    objectOf: createObjectOfChecker,
    exact: createExactChecker

};
/* eslint-enable fecs-valid-var-jsdoc */
// #[end]


// module.exports = DataTypes;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 创建数据检测函数
 */


// #[begin] error

/**
 * 创建数据检测函数
 *
 * @param  {Object} dataTypes     数据格式
 * @param  {string} componentName 组件名
 * @return {Function}
 */
function createDataTypesChecker(dataTypes, componentName) {

    /**
     * 校验 data 是否满足 data types 的格式
     *
     * @param  {*} data 数据
     */
    return function (data) {

        for (var dataTypeName in dataTypes) {
            /* istanbul ignore else  */
            if (dataTypes.hasOwnProperty(dataTypeName)) {

                var dataTypeChecker = dataTypes[dataTypeName];

                if (typeof dataTypeChecker !== 'function') {
                    throw new Error('[SAN ERROR] '
                        + componentName + ':' + dataTypeName + ' is invalid; '
                        + 'it must be a function, usually from san.DataTypes'
                    );
                }

                dataTypeChecker(
                    data,
                    dataTypeName,
                    componentName,
                    dataTypeName
                );


            }
        }

    };

}

// #[end]

// module.exports = createDataTypesChecker;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 字符串源码读取类
 */


/**
 * 字符串源码读取类，用于模板字符串解析过程
 *
 * @class
 * @param {string} source 要读取的字符串
 */
function Walker(source) {
    this.source = source;
    this.len = this.source.length;
    this.index = 0;
}

/**
 * 获取当前字符码
 *
 * @return {number}
 */
Walker.prototype.currentCode = function () {
    return this.source.charCodeAt(this.index);
};

/**
 * 截取字符串片段
 *
 * @param {number} start 起始位置
 * @param {number} end 结束位置
 * @return {string}
 */
Walker.prototype.cut = function (start, end) {
    return this.source.slice(start, end);
};

/**
 * 向前读取字符
 *
 * @param {number} distance 读取字符数
 */
Walker.prototype.go = function (distance) {
    this.index += distance;
};

/**
 * 读取下一个字符，返回下一个字符的 code
 *
 * @return {number}
 */
Walker.prototype.nextCode = function () {
    this.go(1);
    return this.currentCode();
};

/**
 * 获取相应位置字符的 code
 *
 * @param {number} index 字符位置
 * @return {number}
 */
Walker.prototype.charCode = function (index) {
    return this.source.charCodeAt(index);
};

/**
 * 向前读取字符，直到遇到指定字符再停止
 * 未指定字符时，当遇到第一个非空格、制表符的字符停止
 *
 * @param {number=} charCode 指定字符的code
 * @return {boolean} 当指定字符时，返回是否碰到指定的字符
 */
Walker.prototype.goUntil = function (charCode) {
    var code;
    while (this.index < this.len && (code = this.currentCode())) {
        switch (code) {
            case 32: // 空格 space
            case 9: // 制表符 tab
            case 13: // \r
            case 10: // \n
                this.index++;
                break;

            default:
                if (code === charCode) {
                    this.index++;
                    return 1;
                }
                return;
        }
    }
};

/**
 * 向前读取符合规则的字符片段，并返回规则匹配结果
 *
 * @param {RegExp} reg 字符片段的正则表达式
 * @param {boolean} isMatchStart 是否必须匹配当前位置
 * @return {Array?}
 */
Walker.prototype.match = function (reg, isMatchStart) {
    reg.lastIndex = this.index;

    var match = reg.exec(this.source);
    if (match && (!isMatchStart || this.index === match.index)) {
        this.index = reg.lastIndex;
        return match;
    }
};

// exports = module.exports = Walker;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 表达式类型
 */

/**
 * 表达式类型
 *
 * @const
 * @type {Object}
 */
var ExprType = {
    STRING: 1,
    NUMBER: 2,
    BOOL: 3,
    ACCESSOR: 4,
    INTERP: 5,
    CALL: 6,
    TEXT: 7,
    BINARY: 8,
    UNARY: 9,
    TERTIARY: 10,
    OBJECT: 11,
    ARRAY: 12,
    NULL: 13
};

// exports = module.exports = ExprType;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 把 kebab case 字符串转换成 camel case
 */

/**
 * 把 kebab case 字符串转换成 camel case
 *
 * @param {string} source 源字符串
 * @return {string}
 */
function kebab2camel(source) {
    return source.replace(/-+(.)/ig, function (match, alpha) {
        return alpha.toUpperCase();
    });
}

// exports = module.exports = kebab2camel;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file bool属性表
 */


// var splitStr2Obj = require('../util/split-str-2-obj');

/**
 * bool属性表
 *
 * @type {Object}
 */
var boolAttrs = splitStr2Obj(
    'allowpaymentrequest,async,autofocus,autoplay,'
    + 'checked,controls,default,defer,disabled,formnovalidate,'
    + 'hidden,ismap,itemscope,loop,multiple,muted,nomodule,novalidate,'
    + 'open,readonly,required,reversed,selected,typemustmatch'
);

// exports = module.exports = boolAttrs;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 创建访问表达式对象
 */

// var ExprType = require('./expr-type');

/**
 * 创建访问表达式对象
 *
 * @param {Array} paths 访问路径
 * @return {Object}
 */
function createAccessor(paths) {
    return {
        type: 4,
        paths: paths
    };
}

// exports = module.exports = createAccessor;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取字符串
 */


// var ExprType = require('./expr-type');

/**
 * 读取字符串
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readString(walker) {
    var startCode = walker.currentCode();
    var startIndex = walker.index;
    var charCode;

    walkLoop: while ((charCode = walker.nextCode())) {
        switch (charCode) {
            case 92: // \
                walker.go(1);
                break;
            case startCode:
                walker.go(1);
                break walkLoop;
        }
    }

    var literal = walker.cut(startIndex, walker.index);
    return {
        type: 1,
        // 处理字符转义
        value: (new Function('return ' + literal))()
    };
}

// exports = module.exports = readString;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取一元表达式
 */

// var ExprType = require('./expr-type');
// var readString = require('./read-string');
// var readNumber = require('./read-number');
// var readCall = require('./read-call');
// var readParenthesizedExpr = require('./read-parenthesized-expr');
// var readTertiaryExpr = require('./read-tertiary-expr');

function postUnaryExpr(expr, operator) {
    switch (operator) {
        case 33:
            var value;
            switch (expr.type) {
                case 2:
                case 1:
                case 3:
                    value = !expr.value;
                    break;
                case 12:
                case 11:
                    value = false;
                    break;
                case 13:
                    value = true;
                    break;
            }

            if (value != null) {
                return {
                    type: 3,
                    value: value
                };
            }
            break;

        case 43:
            switch (expr.type) {
                case 2:
                case 1:
                case 3:
                    return {
                        type: 2,
                        value: +expr.value
                    };
            }
            break;

        case 45:
            switch (expr.type) {
                case 2:
                case 1:
                case 3:
                    return {
                        type: 2,
                        value: -expr.value
                    };
            }
            break;
    }

    return {
        type: 9,
        expr: expr,
        operator: operator
    };
}

/**
 * 读取一元表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readUnaryExpr(walker) {
    walker.goUntil();

    var currentCode = walker.currentCode();
    switch (currentCode) {
        case 33: // !
        case 43: // +
        case 45: // -
            walker.go(1);
            return postUnaryExpr(readUnaryExpr(walker), currentCode);

        case 34: // "
        case 39: // '
            return readString(walker);

        case 48: // number
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
            return readNumber(walker);

        case 40: // (
            return readParenthesizedExpr(walker);

        // array literal
        case 91: // [
            walker.go(1);
            var arrItems = [];
            while (!walker.goUntil(93)) { // ]
                var item = {};
                arrItems.push(item);

                if (walker.currentCode() === 46 && walker.match(/\.\.\.\s*/g)) {
                    item.spread = true;
                }

                item.expr = readTertiaryExpr(walker);
                walker.goUntil(44); // ,
            }

            return {
                type: 12,
                items: arrItems
            };

        // object literal
        case 123: // {
            walker.go(1);
            var objItems = [];

            while (!walker.goUntil(125)) { // }
                var item = {};
                objItems.push(item);

                if (walker.currentCode() === 46 && walker.match(/\.\.\.\s*/g)) {
                    item.spread = true;
                    item.expr = readTertiaryExpr(walker);
                }
                else {
                    // #[begin] error
                    var walkerIndexBeforeName = walker.index;
                    // #[end]

                    item.name = readUnaryExpr(walker);

                    // #[begin] error
                    if (item.name.type > 4) {
                        throw new Error(
                            '[SAN FATAL] unexpect object name: '
                            + walker.cut(walkerIndexBeforeName, walker.index)
                        );
                    }
                    // #[end]

                    if (walker.goUntil(58)) { // :
                        item.expr = readTertiaryExpr(walker);
                    }
                    else {
                        item.expr = item.name;
                    }

                    if (item.name.type === 4) {
                        item.name = item.name.paths[0];
                    }
                }

                walker.goUntil(44); // ,
            }

            return {
                type: 11,
                items: objItems
            };
    }

    return readCall(walker);
}

// exports = module.exports = readUnaryExpr;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取数字
 */


// var ExprType = require('./expr-type');
// var readUnaryExpr = require('./read-unary-expr');

/**
 * 读取数字
 *
 * @inner
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readNumber(walker) {
    var match = walker.match(/\s*([0-9]+(\.[0-9]+)?)/g, 1);

    if (match) {
        return {
            type: 2,
            value: +match[1]
        };
    }
}

// exports = module.exports = readNumber;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取ident
 */

/**
 * 读取ident
 * 这里的 ident 指标识符(identifier)，也就是通常意义上的变量名
 * 这里默认的变量名规则为：由美元符号($)、数字、字母或者下划线(_)构成的字符串
 *
 * @inner
 * @param {Walker} walker 源码读取对象
 * @return {string}
 */
function readIdent(walker) {
    var match = walker.match(/\s*([\$0-9a-z_]+)/ig, 1);

    // #[begin] error
    if (!match) {
        throw new Error('[SAN FATAL] expect an ident: ' + walker.cut(walker.index));
    }
    // #[end]

    return match[1];
}

// exports = module.exports = readIdent;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取三元表达式
 */

// var ExprType = require('./expr-type');
// var readLogicalORExpr = require('./read-logical-or-expr');

/**
 * 读取三元表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readTertiaryExpr(walker) {
    var conditional = readLogicalORExpr(walker);
    walker.goUntil();

    if (walker.currentCode() === 63) { // ?
        walker.go(1);
        var yesExpr = readTertiaryExpr(walker);
        walker.goUntil();

        if (walker.currentCode() === 58) { // :
            walker.go(1);
            return {
                type: 10,
                segs: [
                    conditional,
                    yesExpr,
                    readTertiaryExpr(walker)
                ]
            };
        }
    }

    return conditional;
}

// exports = module.exports = readTertiaryExpr;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取访问表达式
 */

// var ExprType = require('./expr-type');
// var createAccessor = require('./create-accessor');
// var readIdent = require('./read-ident');
// var readTertiaryExpr = require('./read-tertiary-expr');

/**
 * 读取访问表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readAccessor(walker) {
    var firstSeg = readIdent(walker);
    switch (firstSeg) {
        case 'true':
        case 'false':
            return {
                type: 3,
                value: firstSeg === 'true'
            };
        case 'null':
            return {
                type: 13
            };
    }

    var result = createAccessor([
        {
            type: 1,
            value: firstSeg
        }
    ]);

    /* eslint-disable no-constant-condition */
    accessorLoop: while (1) {
    /* eslint-enable no-constant-condition */

        switch (walker.currentCode()) {
            case 46: // .
                walker.go(1);

                // ident as string
                result.paths.push({
                    type: 1,
                    value: readIdent(walker)
                });
                break;

            case 91: // [
                walker.go(1);
                result.paths.push(readTertiaryExpr(walker));
                walker.goUntil(93); // ]
                break;

            default:
                break accessorLoop;
        }
    }

    return result;
}

// exports = module.exports = readAccessor;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取调用
 */

// var ExprType = require('./expr-type');
// var readAccessor = require('./read-accessor');
// var readTertiaryExpr = require('./read-tertiary-expr');

/**
 * 读取调用
 *
 * @param {Walker} walker 源码读取对象
 * @param {Array=} defaultArgs 默认参数
 * @return {Object}
 */
function readCall(walker, defaultArgs) {
    walker.goUntil();
    var result = readAccessor(walker);

    var args;
    if (walker.goUntil(40)) { // (
        args = [];

        while (!walker.goUntil(41)) { // )
            args.push(readTertiaryExpr(walker));
            walker.goUntil(44); // ,
        }
    }
    else if (defaultArgs) {
        args = defaultArgs;
    }

    if (args) {
        result = {
            type: 6,
            name: result,
            args: args
        };
    }

    return result;
}

// exports = module.exports = readCall;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取括号表达式
 */

// var readTertiaryExpr = require('./read-tertiary-expr');

/**
 * 读取括号表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readParenthesizedExpr(walker) {
    walker.go(1);
    var expr = readTertiaryExpr(walker);
    walker.goUntil(41); // )

    expr.parenthesized = true;
    return expr;
}

// exports = module.exports = readParenthesizedExpr;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取乘法表达式
 */

// var ExprType = require('./expr-type');
// var readUnaryExpr = require('./read-unary-expr');

/**
 * 读取乘法表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readMultiplicativeExpr(walker) {
    var expr = readUnaryExpr(walker);

    while (1) {
        walker.goUntil();

        var code = walker.currentCode();
        switch (code) {
            case 37: // %
            case 42: // *
            case 47: // /
                walker.go(1);
                expr = {
                    type: 8,
                    operator: code,
                    segs: [expr, readUnaryExpr(walker)]
                };
                continue;
        }

        break;
    }


    return expr;
}

// exports = module.exports = readMultiplicativeExpr;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取加法表达式
 */

// var ExprType = require('./expr-type');
// var readMultiplicativeExpr = require('./read-multiplicative-expr');


/**
 * 读取加法表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readAdditiveExpr(walker) {
    var expr = readMultiplicativeExpr(walker);

    while (1) {
        walker.goUntil();
        var code = walker.currentCode();

        switch (code) {
            case 43: // +
            case 45: // -
                walker.go(1);
                expr = {
                    type: 8,
                    operator: code,
                    segs: [expr, readMultiplicativeExpr(walker)]
                };
                continue;
        }

        break;
    }

    return expr;
}

// exports = module.exports = readAdditiveExpr;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取关系判断表达式
 */

// var ExprType = require('./expr-type');
// var readAdditiveExpr = require('./read-additive-expr');

/**
 * 读取关系判断表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readRelationalExpr(walker) {
    var expr = readAdditiveExpr(walker);
    walker.goUntil();

    var code = walker.currentCode();
    switch (code) {
        case 60: // <
        case 62: // >
            if (walker.nextCode() === 61) {
                code += 61;
                walker.go(1);
            }

            return {
                type: 8,
                operator: code,
                segs: [expr, readAdditiveExpr(walker)]
            };
    }

    return expr;
}

// exports = module.exports = readRelationalExpr;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取相等比对表达式
 */

// var ExprType = require('./expr-type');
// var readRelationalExpr = require('./read-relational-expr');

/**
 * 读取相等比对表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readEqualityExpr(walker) {
    var expr = readRelationalExpr(walker);
    walker.goUntil();

    var code = walker.currentCode();
    switch (code) {
        case 61: // =
        case 33: // !
            if (walker.nextCode() === 61) {
                code += 61;
                if (walker.nextCode() === 61) {
                    code += 61;
                    walker.go(1);
                }

                return {
                    type: 8,
                    operator: code,
                    segs: [expr, readRelationalExpr(walker)]
                };
            }

            walker.go(-1);
    }

    return expr;
}

// exports = module.exports = readEqualityExpr;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取逻辑与表达式
 */

// var ExprType = require('./expr-type');
// var readEqualityExpr = require('./read-equality-expr');

/**
 * 读取逻辑与表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readLogicalANDExpr(walker) {
    var expr = readEqualityExpr(walker);
    walker.goUntil();

    if (walker.currentCode() === 38) { // &
        if (walker.nextCode() === 38) {
            walker.go(1);
            return {
                type: 8,
                operator: 76,
                segs: [expr, readLogicalANDExpr(walker)]
            };
        }

        walker.go(-1);
    }

    return expr;
}

// exports = module.exports = readLogicalANDExpr;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取逻辑或表达式
 */

// var ExprType = require('./expr-type');
// var readLogicalANDExpr = require('./read-logical-and-expr');

/**
 * 读取逻辑或表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readLogicalORExpr(walker) {
    var expr = readLogicalANDExpr(walker);
    walker.goUntil();

    if (walker.currentCode() === 124) { // |
        if (walker.nextCode() === 124) {
            walker.go(1);
            return {
                type: 8,
                operator: 248,
                segs: [expr, readLogicalORExpr(walker)]
            };
        }

        walker.go(-1);
    }

    return expr;
}

// exports = module.exports = readLogicalORExpr;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解析表达式
 */

// var Walker = require('./walker');
// var readTertiaryExpr = require('./read-tertiary-expr');

/**
 * 解析表达式
 *
 * @param {string} source 源码
 * @return {Object}
 */
function parseExpr(source) {
    if (!source) {
        return;
    }

    if (typeof source === 'object' && source.type) {
        return source;
    }

    return readTertiaryExpr(new Walker(source));
}

// exports = module.exports = parseExpr;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解析调用
 */


// var Walker = require('./walker');
// var ExprType = require('./expr-type');
// var readCall = require('./read-call');

/**
 * 解析调用
 *
 * @param {string} source 源码
 * @param {Array=} defaultArgs 默认参数
 * @return {Object}
 */
function parseCall(source, defaultArgs) {
    var expr = readCall(new Walker(source), defaultArgs);

    if (expr.type !== 6) {
        expr = {
            type: 6,
            name: expr,
            args: defaultArgs || []
        };
    }
    
    return expr;
}

// exports = module.exports = parseCall;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解析插值替换
 */

// var Walker = require('./walker');
// var readTertiaryExpr = require('./read-tertiary-expr');
// var ExprType = require('./expr-type');
// var readCall = require('./read-call');

/**
 * 解析插值替换
 *
 * @param {string} source 源码
 * @return {Object}
 */
function parseInterp(source) {
    var walker = new Walker(source);

    var interp = {
        type: 5,
        expr: readTertiaryExpr(walker),
        filters: []
    };

    while (walker.goUntil(124)) { // |
        var callExpr = readCall(walker, []);
        switch (callExpr.name.paths[0].value) {
            case 'html':
                break;
            case 'raw':
                interp.original = 1;
                break;
            default:
                interp.filters.push(callExpr);
        }
    }

    return interp;
}

// exports = module.exports = parseInterp;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解码 HTML 字符实体
 */

var ENTITY_DECODE_MAP = {
    lt: '<',
    gt: '>',
    nbsp: '\u00a0',
    quot: '\"',
    emsp: '\u2003',
    ensp: '\u2002',
    thinsp: '\u2009',
    copy: '\xa9',
    reg: '\xae',
    zwnj: '\u200c',
    zwj: '\u200d',
    amp: '&'
};

/**
 * 解码 HTML 字符实体
 *
 * @param {string} source 要解码的字符串
 * @return {string}
 */
function decodeHTMLEntity(source) {
    return source
        .replace(/&#([0-9]+);/g, function (match, code) {
            return String.fromCharCode(+code);
        })
        .replace(/&#x([0-9a-f]+);/ig, function (match, code) {
            return String.fromCharCode(parseInt(code, 16));
        })
        .replace(/&([a-z]+);/ig, function (match, code) {
            return ENTITY_DECODE_MAP[code] || match;
        });
}

// exports = module.exports = decodeHTMLEntity;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解析文本
 */

// var Walker = require('./walker');
// var ExprType = require('./expr-type');
// var parseInterp = require('./parse-interp');
// var decodeHTMLEntity = require('../util/decode-html-entity');

/**
 * 对字符串进行可用于new RegExp的字面化
 *
 * @inner
 * @param {string} source 需要字面化的字符串
 * @return {string} 字符串字面化结果
 */
function regexpLiteral(source) {
    return source.replace(/[\^\[\]\$\(\)\{\}\?\*\.\+\\]/g, function (c) {
        return '\\' + c;
    });
}

var delimRegCache = {};

/**
 * 解析文本
 *
 * @param {string} source 源码
 * @param {Array?} delimiters 分隔符。默认为 ['{{', '}}']
 * @return {Object}
 */
function parseText(source, delimiters) {
    delimiters = delimiters || ['{{', '}}'];

    var regCacheKey = delimiters[0] + '>..<' + delimiters[1];
    var exprStartReg = delimRegCache[regCacheKey];
    if (!exprStartReg) {
        exprStartReg = new RegExp(
            regexpLiteral(delimiters[0])
                + '\\s*([\\s\\S]+?)\\s*'
                + regexpLiteral(delimiters[1]),
            'g'
        );
        delimRegCache[regCacheKey] = exprStartReg;
    }

    var exprMatch;

    var walker = new Walker(source);
    var beforeIndex = 0;

    var segs = [];
    var original;
    
    function pushStringToSeg(text) {
        text && segs.push({
            type: 1,
            value: decodeHTMLEntity(text)
        });
    }

    var delimEndLen = delimiters[1].length;
    while ((exprMatch = walker.match(exprStartReg)) != null) {
        var interpSource = exprMatch[1];
        var interpLen = exprMatch[0].length;
        if (walker.cut(walker.index + 1 - delimEndLen, walker.index + 1) === delimiters[1]) {
            interpSource += walker.cut(walker.index, walker.index + 1);
            walker.go(1);
            interpLen++;
        }

        pushStringToSeg(walker.cut(
            beforeIndex,
            walker.index - interpLen
        ));

        var interp = parseInterp(interpSource);
        original = original || interp.original;
        segs.push(interp);

        beforeIndex = walker.index;
    }

    pushStringToSeg(walker.cut(beforeIndex));

    switch (segs.length) {
        case 0:
            return {
                type: 1,
                value: ''
            };

        case 1:
            if (segs[0].type === 5 && segs[0].filters.length === 0 && !segs[0].original) {
                return segs[0].expr;
            }
            return segs[0];
    }

    return original ? {
        type: 7,
        segs: segs,
        original: 1
    } : {
        type: 7,
        segs: segs
    };
}

// exports = module.exports = parseText;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解析指令
 */


// var Walker = require('./walker');
// var parseExpr = require('./parse-expr');
// var parseCall = require('./parse-call');
// var parseText = require('./parse-text');
// var readAccessor = require('./read-accessor');
// var readUnaryExpr = require('./read-unary-expr');

/**
 * 指令解析器
 *
 * @inner
 * @type {Object}
 */
var directiveParsers = {
    'for': function (value) {
        var walker = new Walker(value);
        var match = walker.match(/^\s*([$0-9a-z_]+)(\s*,\s*([$0-9a-z_]+))?\s+in\s+/ig, 1);

        if (match) {
            var directive = {
                item: match[1],
                value: readUnaryExpr(walker)
            };

            if (match[3]) {
                directive.index = match[3];
            }

            if (walker.match(/\s*trackby\s+/ig, 1)) {
                var start = walker.index;
                directive.trackBy = readAccessor(walker);
                directive.trackByRaw = walker.cut(start, walker.index);
            }
            return directive;
        }

        // #[begin] error
        throw new Error('[SAN FATAL] for syntax error: ' + value);
        // #[end]
    },

    'ref': function (value, options) {
        return {
            value: parseText(value, options.delimiters)
        };
    },

    'if': function (value) {
        return {
            value: parseExpr(value.replace(/(^\{\{|\}\}$)/g, ''))
        };
    },

    'elif': function (value) {
        return {
            value: parseExpr(value.replace(/(^\{\{|\}\}$)/g, ''))
        };
    },

    'else': function () {
        return {
            value: {}
        };
    },

    'bind': function (value) {
        return {
            value: parseExpr(value.replace(/(^\{\{|\}\}$)/g, ''))
        };
    },

    'html': function (value) {
        return {
            value: parseExpr(value.replace(/(^\{\{|\}\}$)/g, ''))
        };
    },

    'show': function (value) {
        return {
            value: parseExpr(value.replace(/(^\{\{|\}\}$)/g, ''))
        };
    },

    'is': function (value) {
        return {
            value: parseExpr(value.replace(/(^\{\{|\}\}$)/g, ''))
        };
    },

    'transition': function (value) {
        return {
            value: parseCall(value)
        };
    }
};

/**
 * 解析指令
 *
 * @param {ANode} aNode 抽象节点
 * @param {string} name 指令名称
 * @param {string} value 指令值
 * @param {Object} options 解析参数
 * @param {Array?} options.delimiters 插值分隔符列表
 */
function parseDirective(aNode, name, value, options) {
    if (name === 'else-if') {
        name = 'elif';
    }

    var parser = directiveParsers[name];
    if (parser) {
        aNode.directives[name] = parser(value, options);
    }
}

// exports = module.exports = parseDirective;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解析抽象节点属性
 */

// var each = require('../util/each');
// var kebab2camel = require('../util/kebab2camel');
// var boolAttrs = require('../browser/bool-attrs');
// var ExprType = require('./expr-type');
// var createAccessor = require('./create-accessor');
// var parseExpr = require('./parse-expr');
// var parseCall = require('./parse-call');
// var parseText = require('./parse-text');
// var parseDirective = require('./parse-directive');


/**
 * 解析抽象节点属性
 *
 * @param {ANode} aNode 抽象节点
 * @param {string} name 属性名称
 * @param {string} value 属性值
 * @param {Object} options 解析参数
 * @param {Array?} options.delimiters 插值分隔符列表
 */
function integrateAttr(aNode, name, value, options) {
    var prefixIndex = name.indexOf('-');
    var realName;
    var prefix;

    if (prefixIndex > 0) {
        prefix = name.slice(0, prefixIndex);
        realName = name.slice(prefixIndex + 1);
    }

    switch (prefix) {
        case 'on':
            var event = {
                name: realName,
                modifier: {}
            };
            aNode.events.push(event);

            var colonIndex;
            while ((colonIndex = value.indexOf(':')) > 0) {
                var modifier = value.slice(0, colonIndex);

                // eventHandler("dd:aa") 这种情况不能算modifier，需要辨识
                if (!/^[a-z]+$/i.test(modifier)) {
                    break;
                }

                event.modifier[modifier] = true;
                value = value.slice(colonIndex + 1);
            }

            event.expr = parseCall(value, [
                createAccessor([
                    {type: 1, value: '$event'}
                ])
            ]);
            break;

        case 'san':
        case 's':
            parseDirective(aNode, realName, value, options);
            break;

        case 'prop':
            integrateProp(aNode, realName, value, options);
            break;

        case 'var':
            if (!aNode.vars) {
                aNode.vars = [];
            }

            realName = kebab2camel(realName);
            aNode.vars.push({
                name: realName,
                expr: parseExpr(value.replace(/(^\{\{|\}\}$)/g, ''))
            });
            break;

        default:
            integrateProp(aNode, name, value, options);
    }
}

/**
 * 解析抽象节点绑定属性
 *
 * @inner
 * @param {ANode} aNode 抽象节点
 * @param {string} name 属性名称
 * @param {string} rawValue 属性值
 * @param {Object} options 解析参数
 * @param {Array?} options.delimiters 插值分隔符列表
 */
function integrateProp(aNode, name, rawValue, options) {
    // parse two way binding, e.g. value="{=ident=}"
    if (rawValue && rawValue.indexOf('{=') === 0 && rawValue.slice(-2) === '=}') {
        aNode.props.push({
            name: name,
            expr: parseExpr(rawValue.slice(2, -2)),
            x: 1
        });

        return;
    }

    var expr = parseText(rawValue || '', options.delimiters);

    if (expr.value === '') {
        if (boolAttrs[name]) {
            expr = {
                type: 3,
                value: true
            };
        }
    }
    else {
        switch (name) {
            case 'class':
            case 'style':

                switch (expr.type) {
                    case 7:
                        for (var i = 0, l = expr.segs.length; i < l; i++) {
                            if (expr.segs[i].type === 5) {
                                expr.segs[i].filters.push({
                                    type: 6,
                                    name: createAccessor([
                                        {
                                            type: 1,
                                            value: '_' + name
                                        }
                                    ]),
                                    args: []
                                });
                            }
                        }
                        break;

                    case 5:
                        expr.filters.push({
                            type: 6,
                            name: createAccessor([
                                {
                                    type: 1,
                                    value: '_' + name
                                }
                            ]),
                            args: []
                        });
                        break;

                    default:
                        if (expr.type !== 1) {
                            expr = {
                                type: 5,
                                expr: expr,
                                filters: [{
                                    type: 6,
                                    name: createAccessor([
                                        {
                                            type: 1,
                                            value: '_' + name
                                        }
                                    ]),
                                    args: []
                                }]
                            }
                        }
                }
        }

    }

    aNode.props.push(
        rawValue != null
            ? {name: name, expr: expr}
            : {name: name, expr: expr, noValue: 1}
    );
}


// exports = module.exports = integrateAttr;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解析模板
 */


// var Walker = require('./walker');
// var ExprType = require('./expr-type');
// var integrateAttr = require('./integrate-attr');
// var parseText = require('./parse-text');
// var svgTags = require('../browser/svg-tags');
// var autoCloseTags = require('../browser/auto-close-tags');

// #[begin] error
function getXPath(stack, currentTagName) {
    var path = ['ROOT'];
    for (var i = 1, len = stack.length; i < len; i++) {
        path.push(stack[i].tagName);
    }
    if (currentTagName) {
        path.push(currentTagName);
    }
    return path.join('>');
}
// #[end]

/* eslint-disable fecs-max-statements */

/**
 * 解析 template
 *
 * @param {string} source template源码
 * @param {Object?} options 解析参数
 * @param {string?} options.trimWhitespace 空白文本的处理策略。none|blank|all
 * @param {Array?} options.delimiters 插值分隔符列表
 * @return {ANode}
 */
function parseTemplate(source, options) {
    options = options || {};
    options.trimWhitespace = options.trimWhitespace || 'none';

    var rootNode = {
        directives: {},
        props: [],
        events: [],
        children: []
    };

    if (typeof source !== 'string') {
        return rootNode;
    }

    source = source.replace(/<!--([\s\S]*?)-->/mg, '').replace(/(^\s+|\s+$)/g, '');
    var walker = new Walker(source);

    var tagReg = /<(\/)?([a-z][a-z0-9-]*)\s*/ig;
    var attrReg = /([-:0-9a-z\[\]_]+)(\s*=\s*(([^'"<>\s]+)|"([^"]*?)"|'([^']*?)'))?\s*/ig;

    var tagMatch;
    var currentNode = rootNode;
    var stack = [rootNode];
    var stackIndex = 0;
    var beforeLastIndex = 0;

    while ((tagMatch = walker.match(tagReg)) != null) {
        var tagMatchStart = walker.index - tagMatch[0].length;
        var tagEnd = tagMatch[1];
        var tagName = tagMatch[2];
        if (!svgTags[tagName]) {
            tagName = tagName.toLowerCase();
        }

        // 62: >
        // 47: /
        // 处理 </xxxx >
        if (tagEnd) {
            if (walker.currentCode() === 62) {
                // 满足关闭标签的条件时，关闭标签
                // 向上查找到对应标签，找不到时忽略关闭
                var closeIndex = stackIndex;

                // #[begin] error
                // 如果正在闭合一个自闭合的标签，例如 </input>，报错
                if (autoCloseTags[tagName]) {
                    throw new Error(''
                        + '[SAN ERROR] ' + getXPath(stack, tagName) + ' is a `auto closed` tag, '
                        + 'so it cannot be closed with </' + tagName + '>'
                    );
                }

                // 如果关闭的 tag 和当前打开的不一致，报错
                if (
                    stack[closeIndex].tagName !== tagName
                    // 这里要把 table 自动添加 tbody 的情况给去掉
                    && !(tagName === 'table' && stack[closeIndex].tagName === 'tbody')
                ) {
                    throw new Error('[SAN ERROR] ' + getXPath(stack) + ' is closed with ' + tagName);
                }
                // #[end]


                pushTextNode(source.slice(beforeLastIndex, tagMatchStart));
                while (closeIndex > 0 && stack[closeIndex].tagName !== tagName) {
                    closeIndex--;
                }

                if (closeIndex > 0) {
                    stackIndex = closeIndex - 1;
                    currentNode = stack[stackIndex];
                }
                walker.go(1);
            }
            // #[begin] error
            else {
                // 处理 </xxx 非正常闭合标签

                // 如果闭合标签时，匹配后的下一个字符是 <，即下一个标签的开始，那么当前闭合标签未闭合
                if (walker.currentCode() === 60) {
                    throw new Error(''
                        + '[SAN ERROR] ' + getXPath(stack)
                        + '\'s close tag not closed'
                    );
                }

                // 闭合标签有属性
                throw new Error(''
                    + '[SAN ERROR] ' + getXPath(stack)
                    + '\'s close tag has attributes'
                );
            }
            // #[end]
        }
        else {
            var aElement = {
                directives: {},
                props: [],
                events: [],
                children: [],
                tagName: tagName
            };
            var tagClose = autoCloseTags[tagName];

            // 解析 attributes

            /* eslint-disable no-constant-condition */
            while (1) {
            /* eslint-enable no-constant-condition */

                var nextCharCode = walker.currentCode();

                // 标签结束时跳出 attributes 读取
                // 标签可能直接结束或闭合结束
                if (nextCharCode === 62) {
                    walker.go(1);
                    break;
                }

                // 遇到 /> 按闭合处理
                if (nextCharCode === 47
                    && walker.charCode(walker.index + 1) === 62
                ) {
                    walker.go(2);
                    tagClose = 1;
                    break;
                }

                // template 串结束了
                // 这时候，说明这个读取周期的所有内容，都是text
                if (!nextCharCode) {
                    pushTextNode(walker.cut(beforeLastIndex));
                    aElement = null;
                    break;
                }

                // #[begin] error
                // 在处理一个 open 标签时，如果遇到了 <， 即下一个标签的开始，则当前标签未能正常闭合，报错
                if (nextCharCode === 60) {
                    throw new Error('[SAN ERROR] ' + getXPath(stack, tagName) + ' is not closed');
                }
                // #[end]

                // 读取 attribute
                var attrMatch = walker.match(attrReg, 1);
                if (attrMatch) {
                    integrateAttr(
                        aElement,
                        attrMatch[1],
                        attrMatch[2] ? (attrMatch[4] || (attrMatch[5] == null ? attrMatch[6] : attrMatch[5])) : void(0),
                        options
                    );
                }
                else {
                    pushTextNode(walker.cut(beforeLastIndex, walker.index));
                    aElement = null;
                    break;
                }
            }

            if (aElement) {
                pushTextNode(source.slice(beforeLastIndex, tagMatchStart));

                // handle show directive, append expr to style prop
                if (aElement.directives.show) {
                    // find style prop
                    var styleProp = null;
                    var propsLen = aElement.props.length;
                    while (propsLen--) {
                        if (aElement.props[propsLen].name === 'style') {
                            styleProp = aElement.props[propsLen];
                            break;
                        }
                    }

                    var showStyleExpr = {
                        type: 10,
                        segs: [
                            aElement.directives.show.value,
                            {type: 1, value: ''},
                            {type: 1, value: ';display:none;'}
                        ]
                    };

                    if (styleProp) {
                        if (styleProp.expr.type === 7) {
                            styleProp.expr.segs.push(showStyleExpr);
                        }
                        else {
                            aElement.props[propsLen].expr = {
                                type: 7,
                                segs: [
                                    styleProp.expr,
                                    showStyleExpr
                                ]
                            };
                        }
                    }
                    else {
                        aElement.props.push({
                            name: 'style',
                            expr: showStyleExpr
                        });
                    }
                }

                // match if directive for else/elif directive
                var elseDirective = aElement.directives['else'] // eslint-disable-line dot-notation
                    || aElement.directives.elif;

                if (elseDirective) {
                    var parentChildrenLen = currentNode.children.length;
                    var ifANode = null;

                    while (parentChildrenLen--) {
                        var parentChild = currentNode.children[parentChildrenLen];
                        if (parentChild.textExpr) {
                            currentNode.children.splice(parentChildrenLen, 1);
                            continue;
                        }

                        ifANode = parentChild;
                        break;
                    }

                    // #[begin] error
                    if (!ifANode || !parentChild.directives['if']) { // eslint-disable-line dot-notation
                        throw new Error('[SAN FATEL] else not match if.');
                    }
                    // #[end]

                    if (ifANode) {
                        ifANode.elses = ifANode.elses || [];
                        ifANode.elses.push(aElement);
                    }
                }
                else {
                    if (aElement.tagName === 'tr' && currentNode.tagName === 'table') {
                        var tbodyNode = {
                            directives: {},
                            props: [],
                            events: [],
                            children: [],
                            tagName: 'tbody'
                        };
                        currentNode.children.push(tbodyNode);
                        currentNode = tbodyNode;
                        stack[++stackIndex] = tbodyNode;
                    }

                    currentNode.children.push(aElement);
                }

                if (!tagClose) {
                    currentNode = aElement;
                    stack[++stackIndex] = aElement;
                }
            }

        }

        beforeLastIndex = walker.index;
    }

    pushTextNode(walker.cut(beforeLastIndex));

    return rootNode;

    /**
     * 在读取栈中添加文本节点
     *
     * @inner
     * @param {string} text 文本内容
     */
    function pushTextNode(text) {
        switch (options.trimWhitespace) {
            case 'blank':
                if (/^\s+$/.test(text)) {
                    text = null;
                }
                break;

            case 'all':
                text = text.replace(/(^\s+|\s+$)/g, '');
                break;
        }

        if (text) {
            var expr = parseText(text, options.delimiters);
            var lastChild = currentNode.children[currentNode.children.length - 1];
            var textExpr = lastChild && lastChild.textExpr;

            if (textExpr) {
                if (textExpr.segs) {
                    textExpr.segs = textExpr.segs.concat(expr.segs || expr);
                }
                else if (textExpr.value != null && expr.value != null) {
                    textExpr.value = textExpr.value + expr.value;
                }
                else {
                    lastChild.textExpr = {
                        type: 7,
                        segs: [textExpr].concat(expr.segs || expr)
                    };
                }
            }
            else {
                currentNode.children.push({
                    textExpr: expr
                });
            }
        }
    }
}

/* eslint-enable fecs-max-statements */

// exports = module.exports = parseTemplate;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 默认filter
 */


/* eslint-disable fecs-camelcase */


function defaultStyleFilter(source) {
    if (typeof source === 'object') {
        var result = '';
        for (var key in source) {
            /* istanbul ignore else  */
            if (source.hasOwnProperty(key)) {
                result += key + ':' + source[key] + ';';
            }
        }

        return result;
    }

    return source;
}

/**
 * 默认filter
 *
 * @const
 * @type {Object}
 */
var DEFAULT_FILTERS = {

    /**
     * URL编码filter
     *
     * @param {string} source 源串
     * @return {string} 替换结果串
     */
    url: encodeURIComponent,

    _class: function (source) {
        if (source instanceof Array) {
            return source.join(' ');
        }

        return source;
    },
    _style: defaultStyleFilter,

    _xclass: function (outer, inner) {
        if (outer instanceof Array) {
            outer = outer.join(' ');
        }

        if (outer) {
            if (inner) {
                return inner + ' ' + outer;
            }

            return outer;
        }

        return inner;
    },

    _xstyle: function (outer, inner) {
        outer = outer && defaultStyleFilter(outer);
        if (outer) {
            if (inner) {
                return inner + ';' + outer;
            }

            return outer;
        }

        return inner;
    }
};
/* eslint-enable fecs-camelcase */

// exports = module.exports = DEFAULT_FILTERS;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 表达式计算
 */

// var ExprType = require('../parser/expr-type');
// var extend = require('../util/extend');
// var DEFAULT_FILTERS = require('./default-filters');
// var evalArgs = require('./eval-args');

/**
 * 计算表达式的值
 *
 * @param {Object} expr 表达式对象
 * @param {Data} data 数据容器对象
 * @param {Component=} owner 所属组件环境
 * @return {*}
 */
function evalExpr(expr, data, owner) {
    if (expr.value != null) {
        return expr.value;
    }

    var value;

    switch (expr.type) {
        case 13:
            return null;

        case 9:
            value = evalExpr(expr.expr, data, owner);
            switch (expr.operator) {
                case 33:
                    value = !value;
                    break;

                case 43:
                    value = +value;
                    break;

                case 45:
                    value = 0 - value;
                    break;
            }
            return value;

        case 8:
            value = evalExpr(expr.segs[0], data, owner);
            var rightValue = evalExpr(expr.segs[1], data, owner);

            /* eslint-disable eqeqeq */
            switch (expr.operator) {
                case 37:
                    value = value % rightValue;
                    break;

                case 43:
                    value = value + rightValue;
                    break;

                case 45:
                    value = value - rightValue;
                    break;

                case 42:
                    value = value * rightValue;
                    break;

                case 47:
                    value = value / rightValue;
                    break;

                case 60:
                    value = value < rightValue;
                    break;

                case 62:
                    value = value > rightValue;
                    break;

                case 76:
                    value = value && rightValue;
                    break;

                case 94:
                    value = value != rightValue;
                    break;

                case 121:
                    value = value <= rightValue;
                    break;

                case 122:
                    value = value == rightValue;
                    break;

                case 123:
                    value = value >= rightValue;
                    break;

                case 155:
                    value = value !== rightValue;
                    break;

                case 183:
                    value = value === rightValue;
                    break;

                case 248:
                    value = value || rightValue;
                    break;

            }
            /* eslint-enable eqeqeq */
            return value;

        case 10:
            return evalExpr(
                expr.segs[evalExpr(expr.segs[0], data, owner) ? 1 : 2],
                data,
                owner
            );


        case 12:
            value = [];
            for (var i = 0, l = expr.items.length; i < l; i++) {
                var item = expr.items[i];
                var itemValue = evalExpr(item.expr, data, owner);

                if (item.spread) {
                    itemValue && (value = value.concat(itemValue));
                }
                else {
                    value.push(itemValue);
                }
            }
            return value;

        case 11:
            value = {};
            for (var i = 0, l = expr.items.length; i < l; i++) {
                var item = expr.items[i];
                var itemValue = evalExpr(item.expr, data, owner);

                if (item.spread) {
                    itemValue && extend(value, itemValue);
                }
                else {
                    value[evalExpr(item.name, data, owner)] = itemValue;
                }
            }
            return value;

        case 4:
            return data.get(expr);


        case 5:
            value = evalExpr(expr.expr, data, owner);

            if (owner) {
                for (var i = 0, l = expr.filters.length; i < l; i++) {
                    var filter = expr.filters[i];
                    var filterName = filter.name.paths[0].value;

                    switch (filterName) {
                        case 'url':
                        case '_class':
                        case '_style':
                            value = DEFAULT_FILTERS[filterName](value);
                            break;

                        case '_xclass':
                        case '_xstyle':
                            value = DEFAULT_FILTERS[filterName](value, evalExpr(filter.args[0], data, owner));
                            break;

                        default:
                            value = owner.filters[filterName] && owner.filters[filterName].apply(
                                owner,
                                [value].concat(evalArgs(filter.args, data, owner))
                            );
                    }
                }
            }

            if (value == null) {
                value = '';
            }

            return value;

        case 6:
            if (owner && expr.name.type === 4) {
                var method = owner;
                var pathsLen = expr.name.paths.length;

                for (var i = 0; method && i < pathsLen; i++) {
                    method = method[evalExpr(expr.name.paths[i], data, owner)];
                }

                if (method) {
                    value = method.apply(owner, evalArgs(expr.args, data, owner));
                }
            }

            break;

        /* eslint-disable no-redeclare */
        case 7:
            var buf = '';
            for (var i = 0, l = expr.segs.length; i < l; i++) {
                var seg = expr.segs[i];
                buf += seg.value || evalExpr(seg, data, owner);
            }
            return buf;
    }

    return value;
}

// exports = module.exports = evalExpr;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 为函数调用计算参数数组的值
 */


// var evalExpr = require('./eval-expr');

/**
 * 为函数调用计算参数数组的值
 *
 * @param {Array} args 参数表达式列表
 * @param {Data} data 数据环境
 * @param {Component} owner 组件环境
 * @return {Array}
 */
function evalArgs(args, data, owner) {
    var result = [];
    for (var i = 0; i < args.length; i++) {
        result.push(evalExpr(args[i], data, owner));
    }

    return result;
}

// exports = module.exports = evalArgs;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 比较变更表达式与目标表达式之间的关系
 */

// var ExprType = require('../parser/expr-type');
// var evalExpr = require('./eval-expr');

/**
 * 判断变更表达式与多个表达式之间的关系，0为完全没关系，1为有关系
 *
 * @inner
 * @param {Object} changeExpr 目标表达式
 * @param {Array} exprs 多个源表达式
 * @param {Data} data 表达式所属数据环境
 * @return {number}
 */
function changeExprCompareExprs(changeExpr, exprs, data) {
    for (var i = 0, l = exprs.length; i < l; i++) {
        if (changeExprCompare(changeExpr, exprs[i], data)) {
            return 1;
        }
    }

    return 0;
}

/**
 * 比较变更表达式与目标表达式之间的关系，用于视图更新判断
 * 视图更新需要根据其关系，做出相应的更新行为
 *
 * 0: 完全没关系
 * 1: 变更表达式是目标表达式的母项(如a与a.b) 或 表示需要完全变化
 * 2: 变更表达式是目标表达式相等
 * >2: 变更表达式是目标表达式的子项，如a.b.c与a.b
 *
 * @param {Object} changeExpr 变更表达式
 * @param {Object} expr 要比较的目标表达式
 * @param {Data} data 表达式所属数据环境
 * @return {number}
 */
function changeExprCompare(changeExpr, expr, data) {
    // if (!expr.dynamic) {
    //     return 0;
    // }

    switch (expr.type) {
        case 4:
            var paths = expr.paths;
            var pathsLen = paths.length;
            var changePaths = changeExpr.paths;
            var changeLen = changePaths.length;

            var result = 1;
            for (var i = 0; i < pathsLen; i++) {
                var pathExpr = paths[i];
                var pathExprValue = pathExpr.value;

                if (pathExprValue == null && changeExprCompare(changeExpr, pathExpr, data)) {
                    result = 1;
                    break;
                }

                if (result && i < changeLen
                    /* eslint-disable eqeqeq */
                    && (pathExprValue || evalExpr(pathExpr, data)) != changePaths[i].value
                    /* eslint-enable eqeqeq */
                ) {
                    result = 0;
                }
            }

            if (result) {
                result = Math.max(1, changeLen - pathsLen + 2);
            }
            return result;

        case 9:
            return changeExprCompare(changeExpr, expr.expr, data) ? 1 : 0;


        case 7:
        case 8:
        case 10:
            return changeExprCompareExprs(changeExpr, expr.segs, data);

        case 12:
        case 11:
            for (var i = 0; i < expr.items.length; i++) {
                if (changeExprCompare(changeExpr, expr.items[i].expr, data)) {
                    return 1;
                }
            }

            break;

        case 5:
            if (changeExprCompare(changeExpr, expr.expr, data)) {
                return 1
            }
            else {
                for (var i = 0; i < expr.filters.length; i++) {
                    if (changeExprCompareExprs(changeExpr, expr.filters[i].args, data)) {
                        return 1;
                    }
                }
            }

            break;

        case 6:
            if (changeExprCompareExprs(changeExpr, expr.name.paths, data)
                || changeExprCompareExprs(changeExpr, expr.args, data)
            ) {
                return 1
            }
            break;
    }

    return 0;
}

// exports = module.exports = changeExprCompare;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 数据变更类型枚举
 */

/**
 * 数据变更类型枚举
 *
 * @const
 * @type {Object}
 */
var DataChangeType = {
    SET: 1,
    SPLICE: 2
};

// exports = module.exports = DataChangeType;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 生命周期类
 */

function lifeCycleOwnIs(name) {
    return this[name];
}

/* eslint-disable fecs-valid-var-jsdoc */
/**
 * 节点生命周期信息
 *
 * @inner
 * @type {Object}
 */
var LifeCycle = {
    start: {},

    compiled: {
        is: lifeCycleOwnIs,
        compiled: true
    },

    inited: {
        is: lifeCycleOwnIs,
        compiled: true,
        inited: true
    },

    created: {
        is: lifeCycleOwnIs,
        compiled: true,
        inited: true,
        created: true
    },

    attached: {
        is: lifeCycleOwnIs,
        compiled: true,
        inited: true,
        created: true,
        attached: true
    },

    leaving: {
        is: lifeCycleOwnIs,
        compiled: true,
        inited: true,
        created: true,
        attached: true,
        leaving: true
    },

    detached: {
        is: lifeCycleOwnIs,
        compiled: true,
        inited: true,
        created: true,
        detached: true
    },

    disposed: {
        is: lifeCycleOwnIs,
        disposed: true
    }
};
/* eslint-enable fecs-valid-var-jsdoc */


// exports = module.exports = LifeCycle;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 节点类型
 */

/**
 * 节点类型
 *
 * @const
 * @type {Object}
 */
var NodeType = {
    TEXT: 1,
    IF: 2,
    FOR: 3,
    ELEM: 4,
    CMPT: 5,
    SLOT: 6,
    TPL: 7,
    LOADER: 8
};

// exports = module.exports = NodeType;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 获取 ANode props 数组中相应 name 的项
 */

/**
 * 获取 ANode props 数组中相应 name 的项
 *
 * @param {Object} aNode ANode对象
 * @param {string} name name属性匹配串
 * @return {Object}
 */
function getANodeProp(aNode, name) {
    var index = aNode.hotspot.props[name];
    if (index != null) {
        return aNode.props[index];
    }
}

// exports = module.exports = getANodeProp;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 获取属性处理对象
 */

// var contains = require('../util/contains');
// var empty = require('../util/empty');
// var nextTick = require('../util/next-tick');
// var svgTags = require('../browser/svg-tags');
// var ie = require('../browser/ie');
// var evalExpr = require('../runtime/eval-expr');
// var getANodeProp = require('./get-a-node-prop');
// var NodeType = require('./node-type');


/**
 * HTML 属性和 DOM 操作属性的对照表
 *
 * @inner
 * @const
 * @type {Object}
 */
var HTML_ATTR_PROP_MAP = {
    'readonly': 'readOnly',
    'cellpadding': 'cellPadding',
    'cellspacing': 'cellSpacing',
    'colspan': 'colSpan',
    'rowspan': 'rowSpan',
    'valign': 'vAlign',
    'usemap': 'useMap',
    'frameborder': 'frameBorder',
    'for': 'htmlFor'
};

/**
 * 默认的元素的属性设置的变换方法
 *
 * @inner
 * @type {Object}
 */
function defaultElementPropHandler(el, value, name) {
    var propName = HTML_ATTR_PROP_MAP[name] || name;
    var valueNotNull = value != null;

    // input 的 type 是个特殊属性，其实也应该用 setAttribute
    // 但是 type 不应该运行时动态改变，否则会有兼容性问题
    // 所以这里直接就不管了
    if (propName in el) {
        el[propName] = valueNotNull ? value : '';
    }
    else if (valueNotNull) {
        el.setAttribute(name, value);
    }

    if (!valueNotNull) {
        el.removeAttribute(name);
    }
}

function svgPropHandler(el, value, name) {
    el.setAttribute(name, value);
}

function boolPropHandler(el, value, name) {
    var propName = HTML_ATTR_PROP_MAP[name] || name;
    el[propName] = !!value;
}

// #[begin] allua
// see https://github.com/baidu/san/issues/495
function placeholderHandler(el, value, name, element) {
    /* istanbul ignore if */
    if (ie > 9 && !el.value && value) {
        element.__bkph = true;
        nextTick(function () {
            element.__bkph = false;
        });
    }

    defaultElementPropHandler(el, value, name);
}
// #[end]

/* eslint-disable fecs-properties-quote */
/**
 * 默认的属性设置变换方法
 *
 * @inner
 * @type {Object}
 */
var defaultElementPropHandlers = {
    style: function (el, value) {
        el.style.cssText = value;
    },

    'class': function (el, value) { // eslint-disable-line
        if (
            // #[begin] allua
            ie
            ||
            // #[end]
            el.className !== value
        ) {
            el.className = value;
        }
    },

    slot: empty,

    draggable: boolPropHandler
};
/* eslint-enable fecs-properties-quote */

var analInputChecker = {
    checkbox: contains,
    radio: function (a, b) {
        return a === b;
    }
};

function analInputCheckedState(element, value) {
    var bindValue = getANodeProp(element.aNode, 'value');
    var bindType = getANodeProp(element.aNode, 'type');

    if (bindValue && bindType) {
        var type = evalExpr(bindType.expr, element.scope, element.owner);

        if (analInputChecker[type]) {
            var bindChecked = getANodeProp(element.aNode, 'checked');
            if (bindChecked != null && !bindChecked.hintExpr) {
                bindChecked.hintExpr = bindValue.expr;
            }

            return !!analInputChecker[type](
                value,
                element.data
                    ? evalExpr(bindValue.expr, element.data, element)
                    : evalExpr(bindValue.expr, element.scope, element.owner)
            );
        }
    }
}

var elementPropHandlers = {
    input: {
        multiple: boolPropHandler,
        checked: function (el, value, name, element) {
            var state = analInputCheckedState(element, value);

            boolPropHandler(
                el,
                state != null ? state : value,
                'checked',
                element
            );

            // #[begin] allua
            // 代码不用抽出来防重复，allua内的代码在现代浏览器版本会被编译时干掉，gzip也会处理重复问题
            // see: #378
            /* istanbul ignore if */
            if (ie && ie < 8 && !element.lifeCycle.attached) {
                boolPropHandler(
                    el,
                    state != null ? state : value,
                    'defaultChecked',
                    element
                );
            }
            // #[end]
        },

        // #[begin] allua
        placeholder: placeholderHandler,
        // #[end]

        readonly: boolPropHandler,
        disabled: boolPropHandler,
        autofocus: boolPropHandler,
        required: boolPropHandler
    },

    option: {
        value: function (el, value, name, element) {
            defaultElementPropHandler(el, value, name, element);

            if (isOptionSelected(element, value)) {
                el.selected = true;
            }
        }
    },

    select: {
        readonly: boolPropHandler,
        disabled: boolPropHandler,
        autofocus: boolPropHandler,
        required: boolPropHandler
    },

    textarea: {
        // #[begin] allua
        placeholder: placeholderHandler,
        // #[end]
        readonly: boolPropHandler,
        disabled: boolPropHandler,
        autofocus: boolPropHandler,
        required: boolPropHandler
    },

    button: {
        disabled: boolPropHandler,
        autofocus: boolPropHandler,
        type: function (el, value) {
            if (value != null) {
                el.setAttribute('type', value);
            }
            else {
                el.removeAttribute('type');
            }
        }
    }
};

function isOptionSelected(element, value) {
    var parentSelect = element.parent;
    while (parentSelect) {
        if (parentSelect.tagName === 'select') {
            break;
        }

        parentSelect = parentSelect.parent;
    }


    if (parentSelect) {
        var selectValue = null;
        var prop;
        var expr;

        if ((prop = getANodeProp(parentSelect.aNode, 'value'))
            && (expr = prop.expr)
        ) {
            selectValue = parentSelect.nodeType === 5
                ? evalExpr(expr, parentSelect.data, parentSelect)
                : evalExpr(expr, parentSelect.scope, parentSelect.owner)
                || '';
        }

        if (selectValue === value) {
            return 1;
        }
    }
}


/**
 * 获取属性处理对象
 *
 * @param {string} tagName 元素tag
 * @param {string} attrName 属性名
 * @return {Object}
 */
function getPropHandler(tagName, attrName) {
    if (svgTags[tagName]) {
        return svgPropHandler;
    }

    var tagPropHandlers = elementPropHandlers[tagName];
    if (!tagPropHandlers) {
        tagPropHandlers = elementPropHandlers[tagName] = {};
    }

    var propHandler = tagPropHandlers[attrName];
    if (!propHandler) {
        propHandler = defaultElementPropHandlers[attrName] || defaultElementPropHandler;
        tagPropHandlers[attrName] = propHandler;
    }

    return propHandler;
}

// exports = module.exports = getPropHandler;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 判断变更是否来源于元素
 */

/**
 * 判断变更是否来源于元素，来源于元素时，视图更新需要阻断
 *
 * @param {Object} change 变更对象
 * @param {Element} element 元素
 * @param {string?} propName 属性名，可选。需要精确判断是否来源于此属性时传入
 * @return {boolean}
 */
function isDataChangeByElement(change, element, propName) {
    var changeTarget = change.option.target;
    return changeTarget && changeTarget.node === element
        && (!propName || changeTarget.prop === propName);
}

// exports = module.exports = isDataChangeByElement;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 在对象上使用accessor表达式查找方法
 */

// var evalExpr = require('../runtime/eval-expr');

/**
 * 在对象上使用accessor表达式查找方法
 *
 * @param {Object} source 源对象
 * @param {Object} nameExpr 表达式
 * @param {Data} data 所属数据环境
 * @return {Function}
 */
function findMethod(source, nameExpr, data) {
    var method = source;

    for (var i = 0; method != null && i < nameExpr.paths.length; i++) {
        method = method[evalExpr(nameExpr.paths[i], data)];
    }

    return method;
}

// exports = module.exports = findMethod;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 数据类
 */

// var ExprType = require('../parser/expr-type');
// var evalExpr = require('./eval-expr');
// var DataChangeType = require('./data-change-type');
// var createAccessor = require('../parser/create-accessor');
// var parseExpr = require('../parser/parse-expr');

/**
 * 数据类
 *
 * @class
 * @param {Object?} data 初始数据
 * @param {Model?} parent 父级数据容器
 */
function Data(data, parent) {
    this.parent = parent;
    this.raw = data || {};
    this.listeners = [];
}

// #[begin] error
// 以下两个函数只在开发模式下可用，在生产模式下不存在
/**
 * DataTypes 检测
 */
Data.prototype.checkDataTypes = function () {
    if (this.typeChecker) {
        this.typeChecker(this.raw);
    }
};

/**
 * 设置 type checker
 *
 * @param  {Function} typeChecker 类型校验器
 */
Data.prototype.setTypeChecker = function (typeChecker) {
    this.typeChecker = typeChecker;
};

// #[end]

/**
 * 添加数据变更的事件监听器
 *
 * @param {Function} listener 监听函数
 */
Data.prototype.listen = function (listener) {
    if (typeof listener === 'function') {
        this.listeners.push(listener);
    }
};

/**
 * 移除数据变更的事件监听器
 *
 * @param {Function} listener 监听函数
 */
Data.prototype.unlisten = function (listener) {
    var len = this.listeners.length;
    while (len--) {
        if (!listener || this.listeners[len] === listener) {
            this.listeners.splice(len, 1);
        }
    }
};

/**
 * 触发数据变更
 *
 * @param {Object} change 变更信息对象
 */
Data.prototype.fire = function (change) {
    if (change.option.silent || change.option.silence || change.option.quiet) {
        return;
    }

    for (var i = 0; i < this.listeners.length; i++) {
        this.listeners[i].call(this, change);
    }
};

/**
 * 获取数据项
 *
 * @param {string|Object?} expr 数据项路径
 * @param {Data?} callee 当前数据获取的调用环境
 * @return {*}
 */
Data.prototype.get = function (expr, callee) {
    var value = this.raw;
    if (!expr) {
        return value;
    }

    if (typeof expr !== 'object') {
        expr = parseExpr(expr);
    }

    var paths = expr.paths;
    callee = callee || this;

    value = value[paths[0].value];

    if (value == null && this.parent) {
        value = this.parent.get(expr, callee);
    }
    else {
        for (var i = 1, l = paths.length; value != null && i < l; i++) {
            value = value[paths[i].value || evalExpr(paths[i], callee)];
        }
    }

    return value;
};


/**
 * 数据对象变更操作
 *
 * @inner
 * @param {Object|Array} source 要变更的源数据
 * @param {Array} exprPaths 属性路径
 * @param {number} pathsStart 当前处理的属性路径指针位置
 * @param {number} pathsLen 属性路径长度
 * @param {*} value 变更属性值
 * @param {Data} data 对应的Data对象
 * @return {*} 变更后的新数据
 */
function immutableSet(source, exprPaths, pathsStart, pathsLen, value, data) {
    if (pathsStart >= pathsLen) {
        return value;
    }

    if (source == null) {
        source = {};
    }

    var pathExpr = exprPaths[pathsStart];
    var prop = evalExpr(pathExpr, data);
    var result = source;

    if (source instanceof Array) {
        var index = +prop;
        prop = isNaN(index) ? prop : index;

        result = source.slice(0);
        result[prop] = immutableSet(source[prop], exprPaths, pathsStart + 1, pathsLen, value, data);
    }
    else if (typeof source === 'object') {
        result = {};

        for (var key in source) {
            /* istanbul ignore else  */
            if (key !== prop && source.hasOwnProperty(key)) {
                result[key] = source[key];
            }
        }

        result[prop] = immutableSet(source[prop], exprPaths, pathsStart + 1, pathsLen, value, data);
    }

    if (pathExpr.value == null) {
        exprPaths[pathsStart] = {
            type: typeof prop === 'string' ? 1 : 2,
            value: prop
        };
    }

    return result;
}

/**
 * 设置数据项
 *
 * @param {string|Object} expr 数据项路径
 * @param {*} value 数据值
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 */
Data.prototype.set = function (expr, value, option) {
    option = option || {};

    // #[begin] error
    var exprRaw = expr;
    // #[end]

    expr = parseExpr(expr);

    // #[begin] error
    if (expr.type !== 4) {
        throw new Error('[SAN ERROR] Invalid Expression in Data set: ' + exprRaw);
    }
    // #[end]

    if (this.get(expr) === value && !option.force) {
        return;
    }

    expr = {
        type: 4,
        paths: expr.paths.slice(0)
    };

    var prop = expr.paths[0].value;
    this.raw[prop] = immutableSet(this.raw[prop], expr.paths, 1, expr.paths.length, value, this);

    this.fire({
        type: 1,
        expr: expr,
        value: value,
        option: option
    });

    // #[begin] error
    this.checkDataTypes();
    // #[end]

};

/**
 * 批量设置数据
 *
 * @param {Object} source 待设置的数据集
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 */
Data.prototype.assign = function (source, option) {
    option = option || {};

    for (var key in source) { // eslint-disable-line
        this.set(
            createAccessor([
                {
                    type: 1,
                    value: key
                }
            ]),
            source[key],
            option
        );
    }
};

/**
 * 合并更新数据项
 *
 * @param {string|Object} expr 数据项路径
 * @param {Object} source 待合并的数据
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 */
Data.prototype.merge = function (expr, source, option) {
    option = option || {};

    // #[begin] error
    var exprRaw = expr;
    // #[end]

    expr = parseExpr(expr);

    // #[begin] error
    if (expr.type !== 4) {
        throw new Error('[SAN ERROR] Invalid Expression in Data merge: ' + exprRaw);
    }

    if (typeof this.get(expr) !== 'object') {
        throw new Error('[SAN ERROR] Merge Expects a Target of Type \'object\'; got ' + typeof oldValue);
    }

    if (typeof source !== 'object') {
        throw new Error('[SAN ERROR] Merge Expects a Source of Type \'object\'; got ' + typeof source);
    }
    // #[end]

    for (var key in source) { // eslint-disable-line
        this.set(
            createAccessor(
                expr.paths.concat(
                    [
                        {
                            type: 1,
                            value: key
                        }
                    ]
                )
            ),
            source[key],
            option
        );
    }
};

/**
 * 基于更新函数更新数据项
 *
 * @param {string|Object} expr 数据项路径
 * @param {Function} fn 数据处理函数
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 */
Data.prototype.apply = function (expr, fn, option) {
    // #[begin] error
    var exprRaw = expr;
    // #[end]

    expr = parseExpr(expr);

    // #[begin] error
    if (expr.type !== 4) {
        throw new Error('[SAN ERROR] Invalid Expression in Data apply: ' + exprRaw);
    }
    // #[end]

    var oldValue = this.get(expr);

    // #[begin] error
    if (typeof fn !== 'function') {
        throw new Error(
            '[SAN ERROR] Invalid Argument\'s Type in Data apply: '
            + 'Expected Function but got ' + typeof fn
        );
    }
    // #[end]

    this.set(expr, fn(oldValue), option);
};

/**
 * 数组数据项splice操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {Array} args splice 接受的参数列表，数组项与Array.prototype.splice的参数一致
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 * @return {Array} 新数组
 */
Data.prototype.splice = function (expr, args, option) {
    option = option || {};
    // #[begin] error
    var exprRaw = expr;
    // #[end]

    expr = parseExpr(expr);

    // #[begin] error
    if (expr.type !== 4) {
        throw new Error('[SAN ERROR] Invalid Expression in Data splice: ' + exprRaw);
    }
    // #[end]

    expr = {
        type: 4,
        paths: expr.paths.slice(0)
    };

    var target = this.get(expr);
    var returnValue = [];

    if (target instanceof Array) {
        var index = args[0];
        var len = target.length;
        if (index > len) {
            index = len;
        }
        else if (index < 0) {
            index = len + index;
            if (index < 0) {
                index = 0;
            }
        }

        var newArray = target.slice(0);
        returnValue = newArray.splice.apply(newArray, args);

        this.raw = immutableSet(this.raw, expr.paths, 0, expr.paths.length, newArray, this);

        this.fire({
            expr: expr,
            type: 2,
            index: index,
            deleteCount: returnValue.length,
            value: returnValue,
            insertions: args.slice(2),
            option: option
        });
    }

    // #[begin] error
    this.checkDataTypes();
    // #[end]

    return returnValue;
};

/**
 * 数组数据项push操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {*} item 要push的值
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 * @return {number} 新数组的length属性
 */
Data.prototype.push = function (expr, item, option) {
    var target = this.get(expr);

    if (target instanceof Array) {
        this.splice(expr, [target.length, 0, item], option);
        return target.length + 1;
    }
};

/**
 * 数组数据项pop操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 * @return {*}
 */
Data.prototype.pop = function (expr, option) {
    var target = this.get(expr);

    if (target instanceof Array) {
        var len = target.length;
        if (len) {
            return this.splice(expr, [len - 1, 1], option)[0];
        }
    }
};

/**
 * 数组数据项shift操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 * @return {*}
 */
Data.prototype.shift = function (expr, option) {
    return this.splice(expr, [0, 1], option)[0];
};

/**
 * 数组数据项unshift操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {*} item 要unshift的值
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 * @return {number} 新数组的length属性
 */
Data.prototype.unshift = function (expr, item, option) {
    var target = this.get(expr);

    if (target instanceof Array) {
        this.splice(expr, [0, 0, item], option);
        return target.length + 1;
    }
};

/**
 * 数组数据项移除操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {number} index 要移除项的索引
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 */
Data.prototype.removeAt = function (expr, index, option) {
    this.splice(expr, [index, 1], option);
};

/**
 * 数组数据项移除操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {*} value 要移除的项
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 */
Data.prototype.remove = function (expr, value, option) {
    var target = this.get(expr);

    if (target instanceof Array) {
        var len = target.length;
        while (len--) {
            if (target[len] === value) {
                this.splice(expr, [len, 1], option);
                break;
            }
        }
    }
};

// exports = module.exports = Data;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 获取声明式事件的监听函数
 */


// var evalArgs = require('../runtime/eval-args');
// var findMethod = require('../runtime/find-method');
// var Data = require('../runtime/data');

/**
 * 获取声明式事件的监听函数
 *
 * @param {Object} eventBind 绑定信息对象
 * @param {Component} owner 所属组件环境
 * @param {Data} data 数据环境
 * @param {boolean} isComponentEvent 是否组件自定义事件
 * @return {Function}
 */
function getEventListener(eventBind, owner, data, isComponentEvent) {
    var args = eventBind.expr.args;

    return function (e) {
        e = isComponentEvent ? e : e || window.event;

        var method = findMethod(owner, eventBind.expr.name, data);
        if (typeof method === 'function') {
            method.apply(
                owner,
                args.length ? evalArgs(args, new Data({ $event: e }, data), owner) : []
            );
        }

        if (eventBind.modifier.prevent) {
            e.preventDefault && e.preventDefault();
            return false;
        }

        if (eventBind.modifier.stop) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            else {
                e.cancelBubble = true;
            }
        }
    };
}

// exports = module.exports = getEventListener;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 判断变更数组是否影响到数据引用摘要
 */


/**
 * 判断变更数组是否影响到数据引用摘要
 *
 * @param {Array} changes 变更数组
 * @param {Object} dataRef 数据引用摘要
 * @return {boolean}
 */
function changesIsInDataRef(changes, dataRef) {
    if (dataRef) {
        for (var i = 0; i < changes.length; i++) {
            var change = changes[i];

            if (!change.overview) {
                var paths = change.expr.paths;
                change.overview = paths[0].value;

                if (paths.length > 1) {
                    change.extOverview = paths[0].value + '.' + paths[1].value;
                    change.wildOverview = paths[0].value + '.*';
                }
            }

            if (dataRef[change.overview]
                || change.wildOverview && dataRef[change.wildOverview]
                || change.extOverview && dataRef[change.extOverview]
            ) {
                return true;
            }
        }
    }
}

// exports = module.exports = changesIsInDataRef;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file insertBefore 方法的兼容性封装
 */

/**
 * insertBefore 方法的兼容性封装
 *
 * @param {HTMLNode} targetEl 要插入的节点
 * @param {HTMLElement} parentEl 父元素
 * @param {HTMLElement?} beforeEl 在此元素之前插入
 */
function insertBefore(targetEl, parentEl, beforeEl) {
    if (parentEl) {
        if (beforeEl) {
            parentEl.insertBefore(targetEl, beforeEl);
        }
        else {
            parentEl.appendChild(targetEl);
        }
    }
}

// exports = module.exports = insertBefore;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 元素的基本属性
 */

// var splitStr2Obj = require('../util/split-str-2-obj');

/**
 * 元素的基本属性
 *
 * @type {Object}
 */
var baseProps = splitStr2Obj('class,style,id');

// exports = module.exports = baseProps;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 元素子节点遍历操作类
 */

// var removeEl = require('../browser/remove-el');

// #[begin] reverse
// /**
//  * 元素子节点遍历操作类
//  *
//  * @inner
//  * @class
//  * @param {HTMLElement} el 要遍历的元素
//  */
// function DOMChildrenWalker(el) {
//     this.children = [];
//     this.index = 0;
//     this.target = el;
// 
//     var child = el.firstChild;
//     var next;
//     while (child) {
//         next = child.nextSibling;
// 
//         switch (child.nodeType) {
//             case 3:
//                 if (/^\s*$/.test(child.data || child.textContent)) {
//                     removeEl(child);
//                 }
//                 else {
//                     this.children.push(child);
//                 }
//                 break;
// 
//             case 1:
//             case 8:
//                 this.children.push(child);
//         }
// 
//         child = next;
//     }
// 
//     this.current = this.children[this.index];
//     this.next = this.children[this.index + 1];
// }
// 
// /**
//  * 往下走一个元素
//  */
// DOMChildrenWalker.prototype.goNext = function () {
//     this.current = this.children[++this.index];
//     this.next = this.children[this.index + 1];
// };
// #[end]

// exports = module.exports = DOMChildrenWalker;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 元素节点类
 */


// var changeExprCompare = require('../runtime/change-expr-compare');
// var changesIsInDataRef = require('../runtime/changes-is-in-data-ref');
// var evalExpr = require('../runtime/eval-expr');
// var insertBefore = require('../browser/insert-before');
// var LifeCycle = require('./life-cycle');
// var NodeType = require('./node-type');
// var baseProps = require('./base-props');
// var reverseElementChildren = require('./reverse-element-children');
// var isDataChangeByElement = require('./is-data-change-by-element');
// var getPropHandler = require('./get-prop-handler');
// var createNode = require('./create-node');
// var elementOwnDetach = require('./element-own-detach');
// var elementOwnDispose = require('./element-own-dispose');
// var elementOwnOnEl = require('./element-own-on-el');
// var elementOwnAttached = require('./element-own-attached');
// var nodeSBindInit = require('./node-s-bind-init');
// var nodeSBindUpdate = require('./node-s-bind-update');
// var warnSetHTML = require('./warn-set-html');
// var getNodePath = require('./get-node-path');

/**
 * 元素节点类
 *
 * @class
 * @param {Object} aNode 抽象节点
 * @param {Node} parent 父亲节点
 * @param {Model} scope 所属数据环境
 * @param {Component} owner 所属组件环境
 * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
 */
function Element(aNode, parent, scope, owner, reverseWalker) {
    this.aNode = aNode;
    this.owner = owner;
    this.scope = scope;
    this.parent = parent;

    this.lifeCycle = LifeCycle.start;
    this.children = [];
    this._elFns = [];
    this.parentComponent = parent.nodeType === 5
        ? parent
        : parent.parentComponent;

    this.tagName = aNode.tagName;

    // #[begin] allua
    // ie8- 不支持innerHTML输出自定义标签
    /* istanbul ignore if */
    if (ieOldThan9 && this.tagName.indexOf('-') > 0) {
        this.tagName = 'div';
    }
    // #[end]

    this._sbindData = nodeSBindInit(aNode.directives.bind, this.scope, this.owner);
    this.lifeCycle = LifeCycle.inited;

    // #[begin] reverse
//     if (reverseWalker) {
//         var currentNode = reverseWalker.current;
// 
//         /* istanbul ignore if */
//         if (!currentNode) {
//             throw new Error('[SAN REVERSE ERROR] Element not found. \nPaths: '
//                 + getNodePath(this).join(' > '));
//         }
// 
//         /* istanbul ignore if */
//         if (currentNode.nodeType !== 1) {
//             throw new Error('[SAN REVERSE ERROR] Element type not match, expect 1 but '
//                 + currentNode.nodeType + '.\nPaths: '
//                 + getNodePath(this).join(' > '));
//         }
// 
//         /* istanbul ignore if */
//         if (currentNode.tagName.toLowerCase() !== this.tagName) {
//             throw new Error('[SAN REVERSE ERROR] Element tagName not match, expect '
//                 + this.tagName + ' but meet ' + currentNode.tagName.toLowerCase() + '.\nPaths: '
//                 + getNodePath(this).join(' > '));
//         }
// 
//         this.el = currentNode;
//         reverseWalker.goNext();
// 
//         reverseElementChildren(this, this.scope, this.owner);
// 
//         this.lifeCycle = LifeCycle.created;
//         this._attached();
//         this.lifeCycle = LifeCycle.attached;
//     }
    // #[end]
}



Element.prototype.nodeType = 4;

/**
 * 将元素attach到页面
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
Element.prototype.attach = function (parentEl, beforeEl) {
    if (!this.lifeCycle.attached) {
        if (!this.el) {
            var sourceNode = this.aNode.hotspot.sourceNode;
            var props = this.aNode.props;

            if (sourceNode) {
                this.el = sourceNode.cloneNode(false);
                props = this.aNode.hotspot.dynamicProps;
            }
            else {
                this.el = createEl(this.tagName);
            }

            if (this._sbindData) {
                for (var key in this._sbindData) {
                    if (this._sbindData.hasOwnProperty(key)) {
                        getPropHandler(this.tagName, key)(
                            this.el,
                            this._sbindData[key],
                            key,
                            this
                        );
                    }
                }
            }

            for (var i = 0, l = props.length; i < l; i++) {
                var prop = props[i];
                var value = evalExpr(prop.expr, this.scope, this.owner);

                if (value || !baseProps[prop.name]) {
                    prop.handler(this.el, value, prop.name, this);
                }
            }

            this.lifeCycle = LifeCycle.created;
        }
        insertBefore(this.el, parentEl, beforeEl);

        if (!this._contentReady) {
            var htmlDirective = this.aNode.directives.html;

            if (htmlDirective) {
                // #[begin] error
                warnSetHTML(this.el);
                // #[end]

                this.el.innerHTML = evalExpr(htmlDirective.value, this.scope, this.owner);
            }
            else {
                for (var i = 0, l = this.aNode.children.length; i < l; i++) {
                    var childANode = this.aNode.children[i];
                    var child = childANode.Clazz
                        ? new childANode.Clazz(childANode, this, this.scope, this.owner)
                        : createNode(childANode, this, this.scope, this.owner);
                    this.children.push(child);
                    child.attach(this.el);
                }
            }

            this._contentReady = 1;
        }

        this._attached();

        this.lifeCycle = LifeCycle.attached;
    }
};

Element.prototype.detach = elementOwnDetach;
Element.prototype.dispose = elementOwnDispose;
Element.prototype._onEl = elementOwnOnEl;
Element.prototype._leave = function () {
    if (this.leaveDispose) {
        if (!this.lifeCycle.disposed) {
            var len = this.children.length;
            while (len--) {
                this.children[len].dispose(1, 1);
            }

            len = this._elFns.length;
            while (len--) {
                var fn = this._elFns[len];
                un(this.el, fn[0], fn[1], fn[2]);
            }
            this._elFns = null;

            // #[begin] allua
            /* istanbul ignore if */
            if (this._inputTimer) {
                clearInterval(this._inputTimer);
                this._inputTimer = null;
            }
            // #[end]

            // 如果没有parent，说明是一个root component，一定要从dom树中remove
            if (!this.disposeNoDetach || !this.parent) {
                removeEl(this.el);
            }

            this.lifeCycle = LifeCycle.detached;

            this.el = null;
            this.owner = null;
            this.scope = null;
            this.children = null;
            this.lifeCycle = LifeCycle.disposed;

            if (this._ondisposed) {
                this._ondisposed();
            }
        }
    }
};

/**
 * 视图更新
 *
 * @param {Array} changes 数据变化信息
 */
Element.prototype._update = function (changes) {
    var dataHotspot = this.aNode.hotspot.data;
    if (dataHotspot && changesIsInDataRef(changes, dataHotspot)) {

        // update s-bind
        var me = this;
        this._sbindData = nodeSBindUpdate(
            this.aNode.directives.bind,
            this._sbindData,
            this.scope,
            this.owner,
            changes,
            function (name, value) {
                if (name in me.aNode.hotspot.props) {
                    return;
                }

                getPropHandler(me.tagName, name)(me.el, value, name, me);
            }
        );

        // update prop
        var dynamicProps = this.aNode.hotspot.dynamicProps;
        for (var i = 0, l = dynamicProps.length; i < l; i++) {
            var prop = dynamicProps[i];
            var propName = prop.name;

            for (var j = 0, changeLen = changes.length; j < changeLen; j++) {
                var change = changes[j];

                if (!isDataChangeByElement(change, this, propName)
                    && (
                        changeExprCompare(change.expr, prop.expr, this.scope)
                        || prop.hintExpr && changeExprCompare(change.expr, prop.hintExpr, this.scope)
                    )
                ) {
                    prop.handler(this.el, evalExpr(prop.expr, this.scope, this.owner), propName, this);
                    break;
                }
            }
        }

        // update content
        var htmlDirective = this.aNode.directives.html;
        if (htmlDirective) {
            var len = changes.length;
            while (len--) {
                if (changeExprCompare(changes[len].expr, htmlDirective.value, this.scope)) {
                    // #[begin] error
                    warnSetHTML(this.el);
                    // #[end]

                    this.el.innerHTML = evalExpr(htmlDirective.value, this.scope, this.owner);
                    break;
                }
            }
        }
        else {
            for (var i = 0, l = this.children.length; i < l; i++) {
                this.children[i]._update(changes);
            }
        }
    }
};

/**
 * 执行完成attached状态的行为
 */
Element.prototype._attached = elementOwnAttached;

// exports = module.exports = Element;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 创建节点对应的 stump comment 元素
 */



/**
 * 创建节点对应的 stump comment 主元素
 */
function nodeOwnCreateStump() {
    this.el = this.el || document.createComment(this.id);
}

// exports = module.exports = nodeOwnCreateStump;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 销毁释放元素的子元素
 */

/**
 * 销毁释放元素的子元素
 *
 * @param {Array=} children 子元素数组
 * @param {boolean=} noDetach 是否不要把节点从dom移除
 * @param {boolean=} noTransition 是否不显示过渡动画效果
 */
function elementDisposeChildren(children, noDetach, noTransition) {
    var len = children && children.length;
    while (len--) {
        children[len].dispose(noDetach, noTransition);
    }
}

// exports = module.exports = elementDisposeChildren;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 简单执行销毁节点的行为
 */

// var removeEl = require('../browser/remove-el');
// var LifeCycle = require('./life-cycle');
// var elementDisposeChildren = require('./element-dispose-children');

/**
 * 简单执行销毁节点的行为
 *
 * @param {boolean=} noDetach 是否不要把节点从dom移除
 */
function nodeOwnSimpleDispose(noDetach) {
    elementDisposeChildren(this.children, noDetach, 1);

    if (!noDetach) {
        removeEl(this.el);
    }

    this.el = null;
    this.owner = null;
    this.scope = null;
    this.children = null;

    this.lifeCycle = LifeCycle.disposed;
    if (this._ondisposed) {
        this._ondisposed();
    }
}

// exports = module.exports = nodeOwnSimpleDispose;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 异步组件类
 */

// var guid = require('../util/guid');
// var each = require('../util/each');
// var insertBefore = require('../browser/insert-before');
// var nodeOwnCreateStump = require('./node-own-create-stump');
// var nodeOwnSimpleDispose = require('./node-own-simple-dispose');


/**
 * 异步组件类
 *
 * @class
 * @param {Object} options 初始化参数
 * @param {Object} loader 组件加载器
 */
function AsyncComponent(options, loader) {
    this.options = options;
    this.loader = loader;
    this.id = guid++;
    this.children = [];

    // #[begin] reverse
//     var reverseWalker = options.reverseWalker;
//     if (reverseWalker) {
//         var PlaceholderComponent = this.loader.placeholder;
//         if (PlaceholderComponent) {
//             this.children[0] = new PlaceholderComponent(options);
//         }
// 
//         this._create();
//         insertBefore(this.el, reverseWalker.target, reverseWalker.current);
// 
//         var me = this;
//         this.loader.start(function (ComponentClass) {
//             me.onload(ComponentClass);
//         });
//     }
//     options.reverseWalker = null;
    // #[end]
}

AsyncComponent.prototype._create = nodeOwnCreateStump;
AsyncComponent.prototype.dispose = nodeOwnSimpleDispose;

/**
 * attach到页面
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
AsyncComponent.prototype.attach = function (parentEl, beforeEl) {
    var PlaceholderComponent = this.loader.placeholder;
    if (PlaceholderComponent) {
        var component = new PlaceholderComponent(this.options);
        this.children[0] = component;
        component.attach(parentEl, beforeEl);
    }

    this._create();
    insertBefore(this.el, parentEl, beforeEl);

    var me = this;
    this.loader.start(function (ComponentClass) {
        me.onload(ComponentClass);
    });
};


/**
 * loader加载完成，渲染组件
 *
 * @param {Function=} ComponentClass 组件类
 */
AsyncComponent.prototype.onload = function (ComponentClass) {
    if (this.el && ComponentClass) {
        var component = new ComponentClass(this.options);
        component.attach(this.el.parentNode, this.el);

        var parentChildren = this.options.parent.children;
        if (this.parentIndex == null || parentChildren[this.parentIndex] !== this) {
            each(parentChildren, function (child, index) {
                if (child instanceof AsyncComponent) {
                    child.parentIndex = index;
                }
            });
        }

        parentChildren[this.parentIndex] = component;
    }

    this.dispose();
};

/**
 * 视图更新函数
 *
 * @param {Array} changes 数据变化信息
 */
AsyncComponent.prototype._update = function (changes) {
    this.children[0] && this.children[0]._update(changes);
};

// exports = module.exports = AsyncComponent;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 通过组件反解创建节点的工厂方法
 */

// var Element = require('./element');
// var AsyncComponent = require('./async-component');

// #[begin] reverse
// /**
//  * 通过组件反解创建节点
//  *
//  * @param {ANode} aNode 抽象节点
//  * @param {Node} parent 父亲节点
//  * @param {Model} scope 所属数据环境
//  * @param {Component} owner 所属组件环境
//  * @param {DOMChildrenWalker} reverseWalker 子元素遍历对象
//  * @return {Node}
//  */
// function createReverseNode(aNode, parent, scope, owner, reverseWalker) {
//     if (aNode.Clazz) {
//         return new aNode.Clazz(aNode, parent, scope, owner, reverseWalker);
//     }
// 
//     var ComponentOrLoader = owner.components[
//         aNode.directives.is ? evalExpr(aNode.directives.is.value, scope) : aNode.tagName
//     ];
// 
//     if (ComponentOrLoader) {
//         return typeof ComponentOrLoader === 'function'
//             ? new ComponentOrLoader({
//                 source: aNode,
//                 owner: owner,
//                 scope: scope,
//                 parent: parent,
//                 reverseWalker: reverseWalker
//             })
//             : new AsyncComponent({
//                 source: aNode,
//                 owner: owner,
//                 scope: scope,
//                 parent: parent,
//                 reverseWalker: reverseWalker
//             }, ComponentOrLoader);
//     }
// 
//     return new Element(aNode, parent, scope, owner, reverseWalker);
// }
// #[end]

// exports = module.exports = createReverseNode;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 对元素的子节点进行反解
 */


// var each = require('../util/each');
// var DOMChildrenWalker = require('./dom-children-walker');
// var createReverseNode = require('./create-reverse-node');

// #[begin] reverse
// 
// /**
//  * 对元素的子节点进行反解
//  *
//  * @param {Object} element 元素
//  */
// function reverseElementChildren(element, scope, owner) {
//     var htmlDirective = element.aNode.directives.html;
// 
//     if (!htmlDirective) {
//         var reverseWalker = new DOMChildrenWalker(element.el);
//         var aNodeChildren = element.aNode.children;
//         
//         for (var i = 0, l = aNodeChildren.length; i < l; i++) {
//             element.children.push(
//                 createReverseNode(aNodeChildren[i], element, scope, owner, reverseWalker)
//             );
//         }
//     }
// }
// #[end]

// exports = module.exports = reverseElementChildren;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 创建节点的工厂方法
 */

// var evalExpr = require('../runtime/eval-expr');
// var Element = require('./element');
// var AsyncComponent = require('./async-component');


/**
 * 创建节点
 *
 * @param {ANode} aNode 抽象节点
 * @param {Node} parent 父亲节点
 * @param {Model} scope 所属数据环境
 * @param {Component} owner 所属组件环境
 * @return {Node}
 */
function createNode(aNode, parent, scope, owner) {
    if (aNode.Clazz) {
        return new aNode.Clazz(aNode, parent, scope, owner);
    }

    var ComponentOrLoader = owner.components[
        aNode.directives.is ? evalExpr(aNode.directives.is.value, scope) : aNode.tagName
    ];

    if (ComponentOrLoader) {
        return typeof ComponentOrLoader === 'function'
            ? new ComponentOrLoader({
                source: aNode,
                owner: owner,
                scope: scope,
                parent: parent
            })
            : new AsyncComponent({
                source: aNode,
                owner: owner,
                scope: scope,
                parent: parent
            }, ComponentOrLoader);
    }

    aNode.Clazz = Element;
    return new Element(aNode, parent, scope, owner);
}

// exports = module.exports = createNode;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 获取 element 的 transition 控制对象
 */

// var evalArgs = require('../runtime/eval-args');
// var findMethod = require('../runtime/find-method');
// var NodeType = require('./node-type');

/**
 * 获取 element 的 transition 控制对象
 *
 * @param {Object} element 元素
 * @return {Object?}
 */
function elementGetTransition(element) {
    var directive = element.aNode.directives.transition;
    var owner = element.owner;

    if (element.nodeType === 5) {
        var cmptGivenTransition = element.source && element.source.directives.transition;
        if (cmptGivenTransition) {
            directive = cmptGivenTransition;
        }
        else {
            owner = element;
        }
    }

    var transition;
    if (directive && owner) {
        transition = findMethod(owner, directive.value.name);

        if (typeof transition === 'function') {
            transition = transition.apply(
                owner,
                evalArgs(directive.value.args, element.scope, owner)
            );
        }
    }

    return transition || element.transition;
}

// exports = module.exports = elementGetTransition;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 将元素从页面上移除
 */

// var elementGetTransition = require('./element-get-transition');

/**
 * 将元素从页面上移除
 */
function elementOwnDetach() {
    var lifeCycle = this.lifeCycle;
    if (lifeCycle.leaving) {
        return;
    }

    if (!this.disposeNoTransition) {
        var transition = elementGetTransition(this);

        if (transition && transition.leave) {
            if (this._toPhase) {
                this._toPhase('leaving');
            }
            else {
                this.lifeCycle = LifeCycle.leaving;
            }

            var me = this;
            transition.leave(this.el, function () {
                me._leave();
            });

            return;
        }
    }

    this._leave();
}


// exports = module.exports = elementOwnDetach;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 销毁释放元素
 */

/**
 * 销毁释放元素
 *
 * @param {boolean=} noDetach 是否不要把节点从dom移除
 * @param {boolean=} noTransition 是否不显示过渡动画效果
 */
function elementOwnDispose(noDetach, noTransition) {
    this.leaveDispose = 1;
    this.disposeNoDetach = noDetach;
    this.disposeNoTransition = noTransition;

    this.detach();
}

// exports = module.exports = elementOwnDispose;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 为元素的 el 绑定事件
 */

// var on = require('../browser/on');

/**
 * 为元素的 el 绑定事件
 *
 * @param {string} name 事件名
 * @param {Function} listener 监听器
 * @param {boolean} capture 是否是捕获阶段触发
 */
function elementOwnOnEl(name, listener, capture) {
    capture = !!capture;
    this._elFns.push([name, listener, capture]);
    on(this.el, name, listener, capture);
}

// exports = module.exports = elementOwnOnEl;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 是否浏览器环境
 */

var isBrowser = typeof window !== 'undefined';

// exports = module.exports = isBrowser;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 开发时的警告提示
 */

// #[begin] error
/**
 * 开发时的警告提示
 *
 * @param {string} message 警告信息
 */
function warn(message) {
    message = '[SAN WARNING] ' + message;

    /* eslint-disable no-console */
    /* istanbul ignore next */
    if (typeof console === 'object' && console.warn) {
        console.warn(message);
    }
    else {
        // 防止警告中断调用堆栈
        setTimeout(function () {
            throw new Error(message);
        }, 0);
    }
    /* eslint-enable no-console */
}
// #[end]

// exports = module.exports = warn;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file  事件绑定不存在的 warning
 */

// var each = require('../util/each');
// var warn = require('../util/warn');

// #[begin] error
/**
 * 事件绑定不存在的 warning
 *
 * @param {Object} eventBind 事件绑定对象
 * @param {Component} owner 所属的组件对象
 */
function warnEventListenMethod(eventBind, owner) {
    var valid = true;
    var method = owner;
    each(eventBind.expr.name.paths, function (path) {
        method = method[path.value];
        valid = !!method;
        return valid;
    });

    if (!valid) {
        var paths = [];
        each(eventBind.expr.name.paths, function (path) {
            paths.push(path.value);
        });

        warn(eventBind.name + ' listen fail,"' + paths.join('.') + '" not exist');
    }
}
// #[end]

// exports = module.exports = warnEventListenMethod;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 完成元素 attached 后的行为
 */


// var empty = require('../util/empty');
// var isBrowser = require('../browser/is-browser');
// var trigger = require('../browser/trigger');
// var NodeType = require('./node-type');
// var elementGetTransition = require('./element-get-transition');
// var getEventListener = require('./get-event-listener');
// var warnEventListenMethod = require('./warn-event-listen-method');

/**
 * 双绑输入框CompositionEnd事件监听函数
 *
 * @inner
 */
function inputOnCompositionEnd() {
    if (!this.composing) {
        return;
    }

    this.composing = 0;
    trigger(this, 'input');
}

/**
 * 双绑输入框CompositionStart事件监听函数
 *
 * @inner
 */
function inputOnCompositionStart() {
    this.composing = 1;
}

function getXPropOutputer(element, xProp, data) {
    return function () {
        xPropOutput(element, xProp, data);
    };
}

function getInputXPropOutputer(element, xProp, data) {
    return function () {
        // #[begin] allua
        /* istanbul ignore if */
        if (element.__bkph) {
            element.__bkph = false;
            return;
        }
        // #[end]

        if (!this.composing) {
            xPropOutput(element, xProp, data);
        }
    };
}

// #[begin] allua
/* istanbul ignore next */
function getInputFocusXPropHandler(element, xProp, data) {
    return function () {
        element._inputTimer = setInterval(function () {
            xPropOutput(element, xProp, data);
        }, 16);
    };
}

/* istanbul ignore next */
function getInputBlurXPropHandler(element) {
    return function () {
        clearInterval(element._inputTimer);
        element._inputTimer = null;
    };
}
// #[end]

function xPropOutput(element, bindInfo, data) {
    /* istanbul ignore if */
    if (!element.lifeCycle.created) {
        return;
    }

    var el = element.el;

    if (element.tagName === 'input' && bindInfo.name === 'checked') {
        var bindValue = getANodeProp(element.aNode, 'value');
        var bindType = getANodeProp(element.aNode, 'type');

        if (bindValue && bindType) {
            switch (el.type.toLowerCase()) {
                case 'checkbox':
                    data[el.checked ? 'push' : 'remove'](bindInfo.expr, el.value);
                    return;

                case 'radio':
                    el.checked && data.set(bindInfo.expr, el.value, {
                        target: {
                            node: element,
                            prop: bindInfo.name
                        }
                    });
                    return;
            }
        }
    }

    data.set(bindInfo.expr, el[bindInfo.name], {
        target: {
            node: element,
            prop: bindInfo.name
        }
    });
}

/**
 * 完成元素 attached 后的行为
 *
 * @param {Object} element 元素节点
 */
function elementOwnAttached() {
    if (this._rootNode) {
        return;
    }

    var isComponent = this.nodeType === 5;
    var data = isComponent ? this.data : this.scope;

    /* eslint-disable no-redeclare */

    // 处理自身变化时双向绑定的逻辑
    var xProps = this.aNode.hotspot.xProps;
    for (var i = 0, l = xProps.length; i < l; i++) {
        var xProp = xProps[i];

        switch (xProp.name) {
            case 'value':
                switch (this.tagName) {
                    case 'input':
                    case 'textarea':
                        if (isBrowser && window.CompositionEvent) {
                            this._onEl('change', inputOnCompositionEnd);
                            this._onEl('compositionstart', inputOnCompositionStart);
                            this._onEl('compositionend', inputOnCompositionEnd);
                        }

                        // #[begin] allua
                        /* istanbul ignore else */
                        if ('oninput' in this.el) {
                        // #[end]
                            this._onEl('input', getInputXPropOutputer(this, xProp, data));
                        // #[begin] allua
                        }
                        else {
                            this._onEl('focusin', getInputFocusXPropHandler(this, xProp, data));
                            this._onEl('focusout', getInputBlurXPropHandler(this));
                        }
                        // #[end]

                        break;

                    case 'select':
                        this._onEl('change', getXPropOutputer(this, xProp, data));
                        break;
                }
                break;

            case 'checked':
                switch (this.tagName) {
                    case 'input':
                        switch (this.el.type) {
                            case 'checkbox':
                            case 'radio':
                                this._onEl('click', getXPropOutputer(this, xProp, data));
                        }
                }
                break;
        }
    }

    var owner = isComponent ? this : this.owner;
    for (var i = 0, l = this.aNode.events.length; i < l; i++) {
        var eventBind = this.aNode.events[i];

        // #[begin] error
        warnEventListenMethod(eventBind, owner);
        // #[end]

        this._onEl(
            eventBind.name,
            getEventListener(eventBind, owner, data, eventBind.modifier),
            eventBind.modifier.capture
        );
    }

    if (isComponent) {
        for (var i = 0, l = this.nativeEvents.length; i < l; i++) {
            var eventBind = this.nativeEvents[i];

            // #[begin] error
            warnEventListenMethod(eventBind, this.owner);
            // #[end]

            this._onEl(
                eventBind.name,
                getEventListener(eventBind, this.owner, this.scope),
                eventBind.modifier.capture
            );
        }
    }

    var transition = elementGetTransition(this);
    if (transition && transition.enter) {
        transition.enter(this.el, empty);
    }
}

// exports = module.exports = elementOwnAttached;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 初始化节点的 s-bind 数据
 */


// var evalExpr = require('../runtime/eval-expr');

/**
 * 初始化节点的 s-bind 数据
 *
 * @param {Object} sBind bind指令对象
 * @param {Model} scope 所属数据环境
 * @param {Component} owner 所属组件环境
 * @return {boolean}
 */
function nodeSBindInit(sBind, scope, owner) {
    if (sBind && scope) {
        return evalExpr(sBind.value, scope, owner);
    }
}

// exports = module.exports = nodeSBindInit;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 计算两个对象 key 的并集
 */

/**
 * 计算两个对象 key 的并集
 *
 * @param {Object} obj1 目标对象
 * @param {Object} obj2 源对象
 * @return {Array}
 */
function unionKeys(obj1, obj2) {
    var result = [];
    var key;

    for (key in obj1) {
        /* istanbul ignore else  */
        if (obj1.hasOwnProperty(key)) {
            result.push(key);
        }
    }

    for (key in obj2) {
        /* istanbul ignore else  */
        if (obj2.hasOwnProperty(key)) {
            !obj1[key] && result.push(key);
        }
    }

    return result;
}

// exports = module.exports = unionKeys;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 更新节点的 s-bind 数据
 */

// var unionKeys = require('../util/union-keys');
// var evalExpr = require('../runtime/eval-expr');
// var changeExprCompare = require('../runtime/change-expr-compare');

/**
 * 更新节点的 s-bind 数据
 *
 * @param {Object} sBind bind指令对象
 * @param {Object} oldBindData 当前s-bind数据
 * @param {Model} scope 所属数据环境
 * @param {Component} owner 所属组件环境
 * @param {Array} changes 变更数组
 * @param {Function} updater 绑定对象子项变更的更新函数
 */
function nodeSBindUpdate(sBind, oldBindData, scope, owner, changes, updater) {
    if (sBind) {
        var len = changes.length;

        while (len--) {
            if (changeExprCompare(changes[len].expr, sBind.value, scope)) {
                var newBindData = evalExpr(sBind.value, scope, owner);
                var keys = unionKeys(newBindData, oldBindData);

                for (var i = 0, l = keys.length; i < l; i++) {
                    var key = keys[i];
                    var value = newBindData[key];

                    if (value !== oldBindData[key]) {
                        updater(key, value);
                    }
                }

                return newBindData;
            }

        }

        return oldBindData;
    }
}

// exports = module.exports = nodeSBindUpdate;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 判断元素是否不允许设置HTML
 */

// some html elements cannot set innerHTML in old ie
// see: https://msdn.microsoft.com/en-us/library/ms533897(VS.85).aspx

/**
 * 判断元素是否不允许设置HTML
 *
 * @param {HTMLElement} el 要判断的元素
 * @return {boolean}
 */
function noSetHTML(el) {
    return /^(col|colgroup|frameset|style|table|tbody|tfoot|thead|tr|select)$/i.test(el.tagName);
}

// exports = module.exports = noSetHTML;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file  获取节点 stump 的 comment
 */

// var noSetHTML = require('../browser/no-set-html');
// var warn = require('../util/warn');

// #[begin] error
/**
 * 获取节点 stump 的 comment
 *
 * @param {HTMLElement} el HTML元素
 */
function warnSetHTML(el) {
    // dont warn if not in browser runtime
    /* istanbul ignore if */
    if (!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document)) {
        return;
    }

    // some html elements cannot set innerHTML in old ie
    // see: https://msdn.microsoft.com/en-us/library/ms533897(VS.85).aspx
    if (noSetHTML(el)) {
        warn('set html for element "' + el.tagName + '" may cause an error in old IE');
    }
}
// #[end]

// exports = module.exports = warnSetHTML;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 获取节点在组件树中的路径
 */


// var NodeType = require('./node-type');

// #[begin] reverse
// /**
//  * 获取节点在组件树中的路径
//  *
//  * @param {Node} node 节点对象
//  * @return {Array}
//  */
// /* istanbul ignore next */
// function getNodePath(node) {
//     var nodePaths = [];
//     var nodeParent = node;
//     while (nodeParent) {
//         switch (nodeParent.nodeType) {
//             case 4:
//                 nodePaths.unshift(nodeParent.tagName);
//                 break;
// 
//             case 2:
//                 nodePaths.unshift('if');
//                 break;
// 
//             case 3:
//                 nodePaths.unshift('for[' + nodeParent.aNode.directives['for'].item + ']'); // eslint-disable-line dot-notation
//                 break;
// 
//             case 6:
//                 nodePaths.unshift('slot[' + (nodeParent.name || 'default') + ']');
//                 break;
// 
//             case 7:
//                 nodePaths.unshift('template');
//                 break;
// 
//             case 5:
//                 nodePaths.unshift('component[' + (nodeParent.source ? nodeParent.source.tagName : 'root') + ']');
//                 break;
// 
//             case 1:
//                 nodePaths.unshift('text');
//                 break;
//         }
// 
//         nodeParent = nodeParent.parent;
//     }
// 
//     return nodePaths;
// }
// #[end]

// exports = module.exports = getNodePath;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解压缩 ANode
 */

// var ExprType = require('./expr-type');

/**
 * 解压缩 ANode
 *
 * @param {Array} packed ANode压缩数据
 * @return {Object}
 */
function unpackANode(packed) {
    var root;
    var nodeStack = [];
    var typeStack = [];
    var stateStack = [];
    var targetStack = [];
    var stackIndex = -1;

    for (var i = 0, l = packed.length; i < l; i++) {
        var current = nodeStack[stackIndex];
        var currentType = typeStack[stackIndex];
        var currentState = stateStack[stackIndex];
        var currentTarget = targetStack[stackIndex];

        while (current) {
            if (currentState === -3) {
                currentState = stateStack[stackIndex] = packed[i++] || -1;
            }

            if (currentState === -1) {
                current = nodeStack[--stackIndex];
                currentType = typeStack[stackIndex];
                currentState = stateStack[stackIndex];
                currentTarget = targetStack[stackIndex];
            }
            else {
                break;
            }
        }
            
        var type = packed[i];
        var node;
        var state = -1;
        var target = false;

        switch (type) {
            // Node: Tag
            case 1:
                node = {
                    directives: {},
                    props: [],
                    events: [],
                    children: []
                };
                var tagName = packed[++i];
                tagName && (node.tagName = tagName);
                state = packed[++i] || -1;
                break;

            case 3:
                node = {
                    type: 1,
                    value: packed[++i]
                };
                break;

            case 4:
                node = {
                    type: 2,
                    value: packed[++i]
                };
                break;

            case 5:
                node = {
                    type: 3,
                    value: !!packed[++i]
                };
                break;
                
            case 19:
                node = {
                    type: 13
                };
                break;

            case 6:
                target = [];
                node = {
                    type: 4,
                    paths: target
                };
                state = packed[++i] || -1;
                break;

            case 7:
                target = [];
                node = {
                    type: 5,
                    filters: target
                };
                packed[++i] && (node.original = 1);
                state = -2;
                break;
                
            case 8:
                target = [];
                node = {
                    type: 6,
                    args: target
                };
                state = -2;
                break;

            case 9:
                target = [];
                node = {
                    type: 7,
                    segs: target
                };

                packed[++i] && (node.original = 1);
                state = packed[++i] || -1;
                break;

            case 10:
                target = [];
                node = {
                    type: 8,
                    operator: packed[++i],
                    segs: target
                };
                state = 2;
                break;

            case 11:
                node = {
                    type: 9,
                    operator: packed[++i]
                };
                state = -2;
                break;

            case 12:
                target = [];
                node = {
                    type: 10,
                    segs: target
                };
                state = 3;
                break;

            case 13:
                target = [];
                node = {
                    type: 11,
                    items: target
                };
                state = packed[++i] || -1;
                break;

            case 14:
                node = {};
                state = -2;
                break;

            case 15:
                node = {spread: true};
                state = -2;
                break;

            case 16:
                target = [];
                node = {
                    type: 12,
                    items: target
                };
                state = packed[++i] || -1;
                break;

            case 17:
            case 18:
                node = type === 18 ? {spread: true} : {};
                state = -2;
                break;

            case 2:
            case 33:
            case 34:
                node = {
                    name: packed[++i]
                };
                (type === 33) && (node.noValue = 1);
                (type === 34) && (node.x = 1);
                state = -2;
                break;

            case 35:
                node = {
                    name: packed[++i],
                    modifier: {}
                };
                state = -2;
                break;

            case 36:
                node = {
                    name: packed[++i]
                };
                state = -2;
                break;

            case 37:
                node = {
                    item: packed[++i]
                };

                var forIndex = packed[++i];
                forIndex && (node.index = forIndex);

                var trackBy = packed[++i];
                if (trackBy) {
                    node.trackByRaw = trackBy;
                    node.trackBy = parseExpr(trackBy);
                }

                state = -2;
                break;
            
            case 38:
            case 39:
            case 41:
            case 42:
            case 43:
            case 44:
            case 45:
                node = {};
                state = -2;
                break;

            // else
            case 40:
                node = {value: {}};
                break;

            // Node: Text
            // Event modifier
            default:
                if (!type) {
                    node = {};
                    state = -2;
                }

        }

        if (!root) {
            root = node;
        }

        if (current) {

            switch (currentType) {
                // Node: Tag
                case 1:
                    if (currentTarget) {
                        current.elses = current.elses || [];
                        current.elses.push(node);
                        if (!(--stateStack[stackIndex])) {
                            stackIndex--;
                        }
                    }
                    else {
                        switch (type) {
                            case 2:
                            case 33:
                            case 34:
                                current.props.push(node);
                                break;
                            
                            case 35:
                                current.events.push(node);
                                break;

                            case 36:
                                current.vars = current.vars || [];
                                current.vars.push(node);
                                break;

                            case 37:
                                current.directives['for'] = node;
                                break;

                            case 38:
                                current.directives['if'] = node;
                                break;

                            case 39:
                                current.directives.elif = node;
                                break;

                            case 40:
                                current.directives['else'] = node;
                                break;

                            case 41:
                                current.directives.ref = node;
                                break;
                            
                            case 42:
                                current.directives.bind = node;
                                break;

                            case 43:
                                current.directives.html = node;
                                break;

                            case 44:
                                current.directives.transition = node;
                                break;

                            case 45:
                                current.directives.is = node;
                                break;

                            case 1:
                            default:
                                current.children.push(node);
                        }

                        if (!(--stateStack[stackIndex])) {
                            if (current.directives['if']) {
                                targetStack[stackIndex] = 'elses';
                                stateStack[stackIndex] = -3;
                            }
                            else {
                                stackIndex--;
                            }
                        }
                    }
                    break;

                // Expr: Interp
                case 7:
                    if (currentState === -2) {
                        stateStack[stackIndex] = -3;
                        current.expr = node;
                    }
                    else {
                        currentTarget.push(node);
                        if (!(--stateStack[stackIndex])) {
                            stackIndex--;
                        }
                    }
                    break;

                // Expr: CALL
                case 8:
                    if (currentState === -2) {
                        stateStack[stackIndex] = -3;
                        current.name = node;
                    }
                    else {
                        currentTarget.push(node);
                        if (!(--stateStack[stackIndex])) {
                            stackIndex--;
                        }
                    }
                    break;
                
                // Expr: ACCESSOR, TEXT, BINARY, TERTIARY, OBJECT, ARRAY
                case 6:
                case 9:
                case 10:
                case 12:
                case 13:
                case 16:
                    currentTarget.push(node);
                    if (!(--stateStack[stackIndex])) {
                        stackIndex--;
                    }
                    break;
                
                // Expr: UNARY
                // Prop
                // var
                // Object Spread Item, Array Item
                case 11:
                case 2:
                case 33:
                case 34:
                case 36:
                case 15:
                case 17:
                case 18:
                    current.expr = node;
                    stackIndex--;
                    break;


                // Expr: Object Item
                case 14:
                    if (currentState === -2) {
                        stateStack[stackIndex] = -4;
                        current.name = node;
                    }
                    else {
                        current.expr = node;
                        stackIndex--;
                    }
                    break;

                // Event
                case 35:
                    if (currentState === -2) {
                        stateStack[stackIndex] = -3;
                        current.expr = node;
                    }
                    else {
                        current.modifier[type] = true;
                        if (!(--stateStack[stackIndex])) {
                            stackIndex--;
                        }
                    }
                    break;

                // Directive: for, if, elif, ref, bind, html, transition, is
                case 37:
                case 38:
                case 39:
                case 41:
                case 42:
                case 43:
                case 44:
                case 45:
                    current.value = node;
                    stackIndex--;
                    break;

                // Node: Text
                default:
                    current.textExpr = node;
                    stackIndex--;
            }
        }

        if (state !== -1) {
            nodeStack[++stackIndex] = node;
            typeStack[stackIndex] = type;
            stateStack[stackIndex] = state;
            targetStack[stackIndex] = target;
        }
    }

    return root;
}


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 给 devtool 发通知消息
 */

// var isBrowser = require('../browser/is-browser');

// #[begin] devtool
var san4devtool;

/**
 * 给 devtool 发通知消息
 *
 * @param {string} name 消息名称
 * @param {*} arg 消息参数
 */
function emitDevtool(name, arg) {
    /* istanbul ignore if */
    if (isBrowser && san4devtool && san4devtool.debug && window.__san_devtool__) {
        window.__san_devtool__.emit(name, arg);
    }
}

emitDevtool.start = function (main) {
    san4devtool = main;
    emitDevtool('san', main);
};
// #[end]

// exports = module.exports = emitDevtool;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 组件类
 */

// var bind = require('../util/bind');
// var each = require('../util/each');
// var guid = require('../util/guid');
// var extend = require('../util/extend');
// var nextTick = require('../util/next-tick');
// var emitDevtool = require('../util/emit-devtool');
// var ExprType = require('../parser/expr-type');
// var parseExpr = require('../parser/parse-expr');
// var parseTemplate = require('../parser/parse-template');
// var createAccessor = require('../parser/create-accessor');
// var unpackANode = require('../parser/unpack-anode');
// var removeEl = require('../browser/remove-el');
// var Data = require('../runtime/data');
// var evalExpr = require('../runtime/eval-expr');
// var changeExprCompare = require('../runtime/change-expr-compare');
// var DataChangeType = require('../runtime/data-change-type');
// var insertBefore = require('../browser/insert-before');
// var un = require('../browser/un');
// var defineComponent = require('./define-component');
// var ComponentLoader = require('./component-loader');
// var createNode = require('./create-node');
// var parseComponentTemplate = require('./parse-component-template');
// var preheatANode = require('./preheat-a-node');
// var LifeCycle = require('./life-cycle');
// var getANodeProp = require('./get-a-node-prop');
// var isDataChangeByElement = require('./is-data-change-by-element');
// var getEventListener = require('./get-event-listener');
// var reverseElementChildren = require('./reverse-element-children');
// var NodeType = require('./node-type');
// var nodeSBindInit = require('./node-s-bind-init');
// var nodeSBindUpdate = require('./node-s-bind-update');
// var elementOwnAttached = require('./element-own-attached');
// var elementOwnOnEl = require('./element-own-on-el');
// var elementOwnDetach = require('./element-own-detach');
// var elementOwnDispose = require('./element-own-dispose');
// var warnEventListenMethod = require('./warn-event-listen-method');
// var elementDisposeChildren = require('./element-dispose-children');
// var createDataTypesChecker = require('../util/create-data-types-checker');
// var warn = require('../util/warn');



/**
 * 组件类
 *
 * @class
 * @param {Object} options 初始化参数
 */
function Component(options) { // eslint-disable-line
    // #[begin] error
    for (var key in Component.prototype) {
        if (this[key] !== Component.prototype[key]) {
            /* eslint-disable max-len */
            warn('\`' + key + '\` is a reserved key of san components. Overriding this property may cause unknown exceptions.');
            /* eslint-enable max-len */
        }
    }
    // #[end]


    options = options || {};

    this.lifeCycle = LifeCycle.start;
    this.children = [];
    this._elFns = [];
    this.listeners = {};
    this.slotChildren = [];
    this.implicitChildren = [];

    var clazz = this.constructor;

    this.filters = this.filters || clazz.filters || {};
    this.computed = this.computed || clazz.computed || {};
    this.messages = this.messages || clazz.messages || {};

    if (options.transition) {
        this.transition = options.transition;
    }

    var proto = clazz.prototype;

    // pre define components class
    /* istanbul ignore else  */
    if (!proto.hasOwnProperty('_cmptReady')) {
        proto.components = clazz.components || proto.components || {};
        var components = proto.components;

        for (var key in components) { // eslint-disable-line
            var cmptClass = components[key];
            if (typeof cmptClass === 'object' && !(cmptClass instanceof ComponentLoader)) {
                components[key] = defineComponent(cmptClass);
            }
            else if (cmptClass === 'self') {
                components[key] = clazz;
            }
        }

        proto._cmptReady = 1;
    }

    // compile
    if (!proto.hasOwnProperty('aNode')) {
        var aPack = clazz.aPack || proto.hasOwnProperty('aPack') && proto.aPack;
        if (aPack) {
            proto.aNode = unpackANode(aPack);
            clazz.aPack = proto.aPack = null;
        }
        else {
            proto.aNode = parseComponentTemplate(clazz);
        }
    }

    preheatANode(proto.aNode, this);

    this.tagName = proto.aNode.tagName;
    this.source = typeof options.source === 'string'
        ? parseTemplate(options.source).children[0]
        : options.source;

    preheatANode(this.source);



    this.sourceSlotNameProps = [];
    this.sourceSlots = {
        named: {}
    };

    this.owner = options.owner;
    this.scope = options.scope;
    this.el = options.el;

    var parent = options.parent;
    if (parent) {
        this.parent = parent;
        this.parentComponent = parent.nodeType === 5
            ? parent
            : parent && parent.parentComponent;
    }
    else if (this.owner) {
        this.parentComponent = this.owner;
        this.scope = this.owner.data;
    }

    this.id = guid++;

    // #[begin] reverse
//     // 组件反解，读取注入的组件数据
//     if (this.el) {
//         var firstCommentNode = this.el.firstChild;
//         if (firstCommentNode && firstCommentNode.nodeType === 3) {
//             firstCommentNode = firstCommentNode.nextSibling;
//         }
// 
//         if (firstCommentNode && firstCommentNode.nodeType === 8) {
//             var stumpMatch = firstCommentNode.data.match(/^\s*s-data:([\s\S]+)?$/);
//             if (stumpMatch) {
//                 var stumpText = stumpMatch[1];
// 
//                 // fill component data
//                 options.data = (new Function('return '
//                     + stumpText
//                         .replace(/^[\s\n]*/, '')
//                         .replace(
//                             /"(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.\d+Z"/g,
//                             function (match, y, mon, d, h, m, s) {
//                                 return 'new Date(' + (+y) + ',' + (+mon) + ',' + (+d)
//                                     + ',' + (+h) + ',' + (+m) + ',' + (+s) + ')';
//                             }
//                         )
//                 ))();
// 
//                 if (firstCommentNode.previousSibling) {
//                     removeEl(firstCommentNode.previousSibling);
//                 }
//                 removeEl(firstCommentNode);
//             }
//         }
//     }
    // #[end]

    // native事件数组
    this.nativeEvents = [];

    if (this.source) {
        // 组件运行时传入的结构，做slot解析
        this._initSourceSlots(1);

        for (var i = 0, l = this.source.events.length; i < l; i++) {
            var eventBind = this.source.events[i];
            // 保存当前实例的native事件，下面创建aNode时候做合并
            if (eventBind.modifier.native) {
                this.nativeEvents.push(eventBind);
            }
            else {
                // #[begin] error
                warnEventListenMethod(eventBind, options.owner);
                // #[end]

                this.on(
                    eventBind.name,
                    getEventListener(eventBind, options.owner, this.scope, 1),
                    eventBind
                );
            }
        }

        this.tagName = this.tagName || this.source.tagName;
        this.binds = this.source.hotspot.binds;

        // init s-bind data
        this._srcSbindData = nodeSBindInit(this.source.directives.bind, this.scope, this.owner);
    }

    this._toPhase('compiled');

    // init data
    var initData = extend(
        typeof this.initData === 'function' && this.initData() || {},
        options.data || this._srcSbindData
    );

    if (this.binds && this.scope) {
        for (var i = 0, l = this.binds.length; i < l; i++) {
            var bindInfo = this.binds[i];

            var value = evalExpr(bindInfo.expr, this.scope, this.owner);
            if (typeof value !== 'undefined') {
                // See: https://github.com/ecomfe/san/issues/191
                initData[bindInfo.name] = value;
            }
        }
    }

    this.data = new Data(initData);

    this.tagName = this.tagName || 'div';
    // #[begin] allua
    // ie8- 不支持innerHTML输出自定义标签
    /* istanbul ignore if */
    if (ieOldThan9 && this.tagName.indexOf('-') > 0) {
        this.tagName = 'div';
    }
    // #[end]


    // #[begin] error
    // 在初始化 + 数据绑定后，开始数据校验
    // NOTE: 只在开发版本中进行属性校验
    var dataTypes = this.dataTypes || clazz.dataTypes;
    if (dataTypes) {
        var dataTypeChecker = createDataTypesChecker(
            dataTypes,
            this.name || clazz.name
        );
        this.data.setTypeChecker(dataTypeChecker);
        this.data.checkDataTypes();
    }
    // #[end]

    this.computedDeps = {};
    for (var expr in this.computed) {
        if (this.computed.hasOwnProperty(expr) && !this.computedDeps[expr]) {
            this._calcComputed(expr);
        }
    }

    this._initDataChanger();
    this._sbindData = nodeSBindInit(this.aNode.directives.bind, this.data, this);
    this._toPhase('inited');

    // #[begin] reverse
//     var reverseWalker = options.reverseWalker;
//     if (this.el || reverseWalker) {
//         var RootComponentType = this.components[
//             this.aNode.directives.is ? evalExpr(this.aNode.directives.is.value, this.data) : this.aNode.tagName
//         ];
// 
//         if (reverseWalker && (this.aNode.hotspot.hasRootNode || RootComponentType)) {
//             this._rootNode = createReverseNode(this.aNode, this, this.data, this, reverseWalker);
//             this._rootNode._getElAsRootNode && (this.el = this._rootNode._getElAsRootNode());
//         }
//         else if (this.el && RootComponentType) {
//             this._rootNode = new RootComponentType({
//                 source: this.aNode,
//                 owner: this,
//                 scope: this.data,
//                 parent: this,
//                 el: this.el
//             });
//         }
//         else {
//             if (reverseWalker) {
//                 var currentNode = reverseWalker.current;
//                 if (currentNode && currentNode.nodeType === 1) {
//                     this.el = currentNode;
//                     reverseWalker.goNext();
//                 }
//             }
// 
//             reverseElementChildren(this, this.data, this);
//         }
// 
//         this._toPhase('created');
//         this._attached();
//         this._toPhase('attached');
//     }
    // #[end]
}


/**
 * 初始化创建组件外部传入的插槽对象
 *
 * @protected
 * @param {boolean} isFirstTime 是否初次对sourceSlots进行计算
 */
Component.prototype._initSourceSlots = function (isFirstTime) {
    this.sourceSlots.named = {};

    // 组件运行时传入的结构，做slot解析
    if (this.source && this.scope) {
        var sourceChildren = this.source.children;

        for (var i = 0, l = sourceChildren.length; i < l; i++) {
            var child = sourceChildren[i];
            var target;

            var slotBind = !child.textExpr && getANodeProp(child, 'slot');
            if (slotBind) {
                isFirstTime && this.sourceSlotNameProps.push(slotBind);

                var slotName = evalExpr(slotBind.expr, this.scope, this.owner);
                target = this.sourceSlots.named[slotName];
                if (!target) {
                    target = this.sourceSlots.named[slotName] = [];
                }
                target.push(child);
            }
            else if (isFirstTime) {
                target = this.sourceSlots.noname;
                if (!target) {
                    target = this.sourceSlots.noname = [];
                }
                target.push(child);
            }
        }
    }
};

/**
 * 类型标识
 *
 * @type {string}
 */
Component.prototype.nodeType = 5;

/**
 * 在下一个更新周期运行函数
 *
 * @param {Function} fn 要运行的函数
 */
Component.prototype.nextTick = nextTick;

Component.prototype._ctx = (new Date()).getTime().toString(16);

/* eslint-disable operator-linebreak */
/**
 * 使节点到达相应的生命周期
 *
 * @protected
 * @param {string} name 生命周期名称
 */
Component.prototype._callHook =
Component.prototype._toPhase = function (name) {
    if (!this.lifeCycle[name]) {
        this.lifeCycle = LifeCycle[name] || this.lifeCycle;
        if (typeof this[name] === 'function') {
            this[name]();
        }

        this._afterLife = this.lifeCycle;

        // 通知devtool
        // #[begin] devtool
        emitDevtool('comp-' + name, this);
        // #[end]
    }
};
/* eslint-enable operator-linebreak */


/**
 * 添加事件监听器
 *
 * @param {string} name 事件名
 * @param {Function} listener 监听器
 * @param {string?} declaration 声明式
 */
Component.prototype.on = function (name, listener, declaration) {
    if (typeof listener === 'function') {
        if (!this.listeners[name]) {
            this.listeners[name] = [];
        }
        this.listeners[name].push({fn: listener, declaration: declaration});
    }
};

/**
 * 移除事件监听器
 *
 * @param {string} name 事件名
 * @param {Function=} listener 监听器
 */
Component.prototype.un = function (name, listener) {
    var nameListeners = this.listeners[name];
    var len = nameListeners && nameListeners.length;

    while (len--) {
        if (!listener || listener === nameListeners[len].fn) {
            nameListeners.splice(len, 1);
        }
    }
};


/**
 * 派发事件
 *
 * @param {string} name 事件名
 * @param {Object} event 事件对象
 */
Component.prototype.fire = function (name, event) {
    var me = this;
    // #[begin] devtool
    emitDevtool('comp-event', {
        name: name, 
        event: event, 
        target: this
    });
    // #[end] 

    each(this.listeners[name], function (listener) {
        listener.fn.call(me, event);
    });
};

/**
 * 计算 computed 属性的值
 *
 * @private
 * @param {string} computedExpr computed表达式串
 */
Component.prototype._calcComputed = function (computedExpr) {
    var computedDeps = this.computedDeps[computedExpr];
    if (!computedDeps) {
        computedDeps = this.computedDeps[computedExpr] = {};
    }

    var me = this;
    this.data.set(computedExpr, this.computed[computedExpr].call({
        data: {
            get: function (expr) {
                // #[begin] error
                if (!expr) {
                    throw new Error('[SAN ERROR] call get method in computed need argument');
                }
                // #[end]

                if (!computedDeps[expr]) {
                    computedDeps[expr] = 1;

                    if (me.computed[expr] && !me.computedDeps[expr]) {
                        me._calcComputed(expr);
                    }

                    me.watch(expr, function () {
                        me._calcComputed(computedExpr);
                    });
                }

                return me.data.get(expr);
            }
        }
    }));
};

/**
 * 派发消息
 * 组件可以派发消息，消息将沿着组件树向上传递，直到遇上第一个处理消息的组件
 *
 * @param {string} name 消息名称
 * @param {*?} value 消息值
 */
Component.prototype.dispatch = function (name, value) {
    var parentComponent = this.parentComponent;

    while (parentComponent) {
        var handler = parentComponent.messages[name] || parentComponent.messages['*'];
        if (typeof handler === 'function') {
            // #[begin] devtool
            emitDevtool('comp-message', {
                target: this,
                value: value, 
                name: name,
                receiver: parentComponent
            });
            // #[end]

            handler.call(
                parentComponent,
                {target: this, value: value, name: name}
            );
            return;
        }

        parentComponent = parentComponent.parentComponent;
    }

    // #[begin] devtool
    emitDevtool('comp-message', {target: this, value: value, name: name});
    // #[end]    
};

/**
 * 获取组件内部的 slot
 *
 * @param {string=} name slot名称，空为default slot
 * @return {Array}
 */
Component.prototype.slot = function (name) {
    var result = [];
    var me = this;

    function childrenTraversal(children) {
        each(children, function (child) {
            if (child.nodeType === 6 && child.owner === me) {
                if (child.isNamed && child.name === name
                    || !child.isNamed && !name
                ) {
                    result.push(child);
                }
            }
            else {
                childrenTraversal(child.children);
            }
        });
    }

    childrenTraversal(this.children);
    return result;
};

/**
 * 获取带有 san-ref 指令的子组件引用
 *
 * @param {string} name 子组件的引用名
 * @return {Component}
 */
Component.prototype.ref = function (name) {
    var refTarget;
    var owner = this;

    function childrenTraversal(children) {
        if (children) {
            for (var i = 0, l = children.length; i < l; i++) {
                elementTraversal(children[i]);
                if (refTarget) {
                    return;
                }
            }
        }
    }

    function elementTraversal(element) {
        var nodeType = element.nodeType;
        if (nodeType === 1) {
            return;
        }

        if (element.owner === owner) {
            var ref;
            switch (element.nodeType) {
                case 4:
                    ref = element.aNode.directives.ref;
                    if (ref && evalExpr(ref.value, element.scope, owner) === name) {
                        refTarget = element.el;
                    }
                    break;

                case 5:
                    ref = element.source.directives.ref;
                    if (ref && evalExpr(ref.value, element.scope, owner) === name) {
                        refTarget = element;
                    }
            }

            if (refTarget) {
                return;
            }

            childrenTraversal(element.slotChildren);
        }

        if (refTarget) {
            return;
        }

        childrenTraversal(element.children);
    }

    this._rootNode ? elementTraversal(this._rootNode) : childrenTraversal(this.children);

    return refTarget;
};


/**
 * 视图更新函数
 *
 * @param {Array?} changes 数据变化信息
 */
Component.prototype._update = function (changes) {
    if (this.lifeCycle.disposed) {
        return;
    }

    var me = this;


    var needReloadForSlot = false;
    this._notifyNeedReload = function () {
        needReloadForSlot = true;
    };

    if (changes) {
        if (this.source) {
            this._srcSbindData = nodeSBindUpdate(
                this.source.directives.bind,
                this._srcSbindData,
                this.scope,
                this.owner,
                changes,
                function (name, value) {
                    if (name in me.source.hotspot.props) {
                        return;
                    }

                    me.data.set(name, value, {
                        target: {
                            node: me.owner
                        }
                    });
                }
            );
        }

        each(changes, function (change) {
            var changeExpr = change.expr;

            each(me.binds, function (bindItem) {
                var relation;
                var setExpr = bindItem.name;
                var updateExpr = bindItem.expr;

                if (!isDataChangeByElement(change, me, setExpr)
                    && (relation = changeExprCompare(changeExpr, updateExpr, me.scope))
                ) {
                    if (relation > 2) {
                        setExpr = createAccessor(
                            [
                                {
                                    type: 1,
                                    value: setExpr
                                }
                            ].concat(changeExpr.paths.slice(updateExpr.paths.length))
                        );
                        updateExpr = changeExpr;
                    }

                    if (relation >= 2 && change.type === 2) {
                        me.data.splice(setExpr, [change.index, change.deleteCount].concat(change.insertions), {
                            target: {
                                node: me.owner
                            }
                        });
                    }
                    else {
                        me.data.set(setExpr, evalExpr(updateExpr, me.scope, me.owner), {
                            target: {
                                node: me.owner
                            }
                        });
                    }
                }
            });

            each(me.sourceSlotNameProps, function (bindItem) {
                needReloadForSlot = needReloadForSlot || changeExprCompare(changeExpr, bindItem.expr, me.scope);
                return !needReloadForSlot;
            });
        });

        if (needReloadForSlot) {
            this._initSourceSlots();
            this._repaintChildren();
        }
        else {
            var slotChildrenLen = this.slotChildren.length;
            while (slotChildrenLen--) {
                var slotChild = this.slotChildren[slotChildrenLen];

                if (slotChild.lifeCycle.disposed) {
                    this.slotChildren.splice(slotChildrenLen, 1);
                }
                else if (slotChild.isInserted) {
                    slotChild._update(changes, 1);
                }
            }
        }
    }

    var dataChanges = this._dataChanges;
    if (dataChanges) {
        this._dataChanges = null;

        this._sbindData = nodeSBindUpdate(
            this.aNode.directives.bind,
            this._sbindData,
            this.data,
            this,
            dataChanges,
            function (name, value) {
                if (me._rootNode || (name in me.aNode.hotspot.props)) {
                    return;
                }

                getPropHandler(me.tagName, name)(me.el, value, name, me);
            }
        );


        if (this._rootNode) {
            this._rootNode._update(dataChanges);
            this._rootNode._getElAsRootNode && (this.el = this._rootNode._getElAsRootNode());
        }
        else {
            var dynamicProps = this.aNode.hotspot.dynamicProps;
                for (var i = 0; i < dynamicProps.length; i++) {
                    var prop = dynamicProps[i];

                    for (var j = 0; j < dataChanges.length; j++) {
                        var change = dataChanges[j];
                        if (changeExprCompare(change.expr, prop.expr, this.data)
                            || prop.hintExpr && changeExprCompare(change.expr, prop.hintExpr, this.data)
                        ) {
                            prop.handler(this.el, evalExpr(prop.expr, this.data, this), prop.name, this);
                            break;
                        }
                    }
                }

                for (var i = 0; i < this.children.length; i++) {
                    this.children[i]._update(dataChanges);
                }
        }

        if (needReloadForSlot) {
            this._initSourceSlots();
            this._repaintChildren();
        }

        for (var i = 0; i < this.implicitChildren.length; i++) {
            this.implicitChildren[i]._update(dataChanges);
        }

        this._toPhase('updated');

        if (this.owner && this._updateBindxOwner(dataChanges)) {
            this.owner._update();
        }
    }

    this._notifyNeedReload = null;
};

Component.prototype._updateBindxOwner = function (dataChanges) {
    var me = this;
    var xbindUped;

    each(dataChanges, function (change) {
        each(me.binds, function (bindItem) {
            var changeExpr = change.expr;
            if (bindItem.x
                && !isDataChangeByElement(change, me.owner)
                && changeExprCompare(changeExpr, parseExpr(bindItem.name), me.data)
            ) {
                var updateScopeExpr = bindItem.expr;
                if (changeExpr.paths.length > 1) {
                    updateScopeExpr = createAccessor(
                        bindItem.expr.paths.concat(changeExpr.paths.slice(1))
                    );
                }

                xbindUped = 1;
                me.scope.set(
                    updateScopeExpr,
                    evalExpr(changeExpr, me.data, me),
                    {
                        target: {
                            node: me,
                            prop: bindItem.name
                        }
                    }
                );
            }
        });
    });

    return xbindUped;
};

/**
 * 重新绘制组件的内容
 * 当 dynamic slot name 发生变更或 slot 匹配发生变化时，重新绘制
 * 在组件级别重绘有点粗暴，但是能保证视图结果正确性
 */
Component.prototype._repaintChildren = function () {
    // TODO: repaint once?

    if (this._rootNode) {
        var parentEl = this._rootNode.el.parentNode;
        var beforeEl = this._rootNode.el.nextSibling;
        this._rootNode.dispose(0, 1);
        this.slotChildren = [];

        this._rootNode = createNode(this.aNode, this, this.data, this);
        this._rootNode.attach(parentEl, beforeEl);
        this._rootNode._getElAsRootNode && (this.el = this._rootNode._getElAsRootNode());
    }
    else {
        elementDisposeChildren(this.children, 0, 1);
        this.children = [];
        this.slotChildren = [];

        for (var i = 0, l = this.aNode.children.length; i < l; i++) {
            var child = createNode(this.aNode.children[i], this, this.data, this);
            this.children.push(child);
            child.attach(this.el);
        }
    }
};


/**
 * 初始化组件内部监听数据变化
 *
 * @private
 * @param {Object} change 数据变化信息
 */
Component.prototype._initDataChanger = function (change) {
    var me = this;

    this._dataChanger = function (change) {
        if (me._afterLife.created) {
            if (!me._dataChanges) {
                nextTick(me._update, me);
                me._dataChanges = [];
            }

            me._dataChanges.push(change);
        }
        else if (me.lifeCycle.inited && me.owner) {
            me._updateBindxOwner([change]);
        }
    };

    this.data.listen(this._dataChanger);
};


/**
 * 监听组件的数据变化
 *
 * @param {string} dataName 变化的数据项
 * @param {Function} listener 监听函数
 */
Component.prototype.watch = function (dataName, listener) {
    var dataExpr = parseExpr(dataName);

    this.data.listen(bind(function (change) {
        if (changeExprCompare(change.expr, dataExpr, this.data)) {
            listener.call(this, evalExpr(dataExpr, this.data, this), change);
        }
    }, this));
};

Component.prototype._getElAsRootNode = function () {
    return this.el;
};

/**
 * 将组件attach到页面
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
Component.prototype.attach = function (parentEl, beforeEl) {
    if (!this.lifeCycle.attached) {
        var hasRootNode = this.aNode.hotspot.hasRootNode
            || this.components[
                this.aNode.directives.is ? evalExpr(this.aNode.directives.is.value, this.data) : this.aNode.tagName
            ];

        if (hasRootNode) {
            this._rootNode = this._rootNode || createNode(this.aNode, this, this.data, this);
            this._rootNode.attach(parentEl, beforeEl);
            this._rootNode._getElAsRootNode && (this.el = this._rootNode._getElAsRootNode());
            this._toPhase('created');
        }
        else {
            if (!this.el) {
                var sourceNode = this.aNode.hotspot.sourceNode;
                var props = this.aNode.props;

                if (sourceNode) {
                    this.el = sourceNode.cloneNode(false);
                    props = this.aNode.hotspot.dynamicProps;
                }
                else {
                    this.el = createEl(this.tagName);
                }

                if (this._sbindData) {
                    for (var key in this._sbindData) {
                        if (this._sbindData.hasOwnProperty(key)) {
                            getPropHandler(this.tagName, key)(
                                this.el,
                                this._sbindData[key],
                                key,
                                this
                            );
                        }
                    }
                }

                for (var i = 0, l = props.length; i < l; i++) {
                    var prop = props[i];
                    var value = evalExpr(prop.expr, this.data, this);

                    if (value || !baseProps[prop.name]) {
                        prop.handler(this.el, value, prop.name, this);
                    }
                }

                this._toPhase('created');
            }

            insertBefore(this.el, parentEl, beforeEl);

            if (!this._contentReady) {
                for (var i = 0, l = this.aNode.children.length; i < l; i++) {
                    var childANode = this.aNode.children[i];
                    var child = childANode.Clazz
                        ? new childANode.Clazz(childANode, this, this.data, this)
                        : createNode(childANode, this, this.data, this);
                    this.children.push(child);
                    child.attach(this.el);
                }

                this._contentReady = 1;
            }

            this._attached();
        }

        this._toPhase('attached');

        // element 都是内部创建的，只有动态创建的 component 才会进入这个分支
        if (this.owner && !this.parent) {
            this.owner.implicitChildren.push(this);
        }
    }
};

Component.prototype.detach = elementOwnDetach;
Component.prototype.dispose = elementOwnDispose;
Component.prototype._onEl = elementOwnOnEl;
Component.prototype._attached = elementOwnAttached;
Component.prototype._leave = function () {
    if (this.leaveDispose) {
        if (!this.lifeCycle.disposed) {
            this.data.unlisten();
            this.dataChanger = null;
            this._dataChanges = null;

            var len = this.implicitChildren.length;
            while (len--) {
                this.implicitChildren[len].dispose(0, 1);
            }

            this.implicitChildren = null;

            this.source = null;
            this.sourceSlots = null;
            this.sourceSlotNameProps = null;

            // 这里不用挨个调用 dispose 了，因为 children 释放链会调用的
            this.slotChildren = null;


            if (this._rootNode) {
                // 如果没有parent，说明是一个root component，一定要从dom树中remove
                this._rootNode.dispose(this.disposeNoDetach && this.parent);
            }
            else {
                var len = this.children.length;
                while (len--) {
                    this.children[len].dispose(1, 1);
                }

                len = this._elFns.length;
                while (len--) {
                    var fn = this._elFns[len];
                    un(this.el, fn[0], fn[1], fn[2]);
                }
                this._elFns = null;

                // #[begin] allua
                /* istanbul ignore if */
                if (this._inputTimer) {
                    clearInterval(this._inputTimer);
                    this._inputTimer = null;
                }
                // #[end]

                // 如果没有parent，说明是一个root component，一定要从dom树中remove
                if (!this.disposeNoDetach || !this.parent) {
                    removeEl(this.el);
                }
            }

            this._toPhase('detached');

            this._rootNode = null;
            this.el = null;
            this.owner = null;
            this.scope = null;
            this.children = null;

            this._toPhase('disposed');

            if (this._ondisposed) {
                this._ondisposed();
            }
        }
    }
    else if (this.lifeCycle.attached) {
        if (this._rootNode) {
            if (this._rootNode.detach) {
                this._rootNode.detach();
            }
            else {
                this._rootNode.dispose();
                this._rootNode = null;
            }
        }
        else {
            removeEl(this.el);
        }

        this._toPhase('detached');
    }
};


// exports = module.exports = Component;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 创建组件类
 */

// var Component = require('./component');
// var inherits = require('../util/inherits');

/**
 * 创建组件类
 *
 * @param {Object} proto 组件类的方法表
 * @param {Function=} SuperComponent 父组件类
 * @return {Function}
 */
function defineComponent(proto, SuperComponent) {
    // 如果传入一个不是 san component 的 constructor，直接返回不是组件构造函数
    // 这种场景导致的错误 san 不予考虑
    if (typeof proto === 'function') {
        return proto;
    }

    // #[begin] error
    if (typeof proto !== 'object') {
        throw new Error('[SAN FATAL] defineComponent need a plain object.');
    }
    // #[end]

    function ComponentClass(option) { // eslint-disable-line
        Component.call(this, option);
    }

    ComponentClass.prototype = proto;
    inherits(ComponentClass, SuperComponent || Component);

    return ComponentClass;
}

// exports = module.exports = defineComponent;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 组件Loader类
 */

// var nextTick = require('../util/next-tick');
// var each = require('../util/each');


/**
 * 组件Loader类
 *
 * @class
 *
 * @param {Function} load load方法
 * @param {Function=} placeholder loading过程中渲染的组件
 * @param {Function=} fallback load失败时渲染的组件
 */
function ComponentLoader(load, placeholder, fallback) {
    this.load = load;
    this.placeholder = placeholder;
    this.fallback = fallback;

    this.listeners = [];
}


/**
 * 开始加载组件
 *
 * @param {Function} onload 组件加载完成监听函数
 */
ComponentLoader.prototype.start = function (onload) {
    var me = this;

    switch (this.state) {
        case 2:
            nextTick(function () {
                onload(me.Component);
            });
            break;

        case 1:
            this.listeners.push(onload);
            break;

        default:
            this.listeners.push(onload);
            this.state = 1;

            var startLoad = this.load();
            var done = function (RealComponent) {
                me.done(RealComponent);
            };

            if (startLoad && typeof startLoad.then === 'function') {
                startLoad.then(done, done);
            }
    }
};

/**
 * 完成组件加载
 *
 * @param {Function=} ComponentClass 组件类
 */
ComponentLoader.prototype.done = function (ComponentClass) {
    this.state = 2;
    ComponentClass = ComponentClass || this.fallback;
    this.Component = ComponentClass;

    each(this.listeners, function (listener) {
        listener(ComponentClass);
    });
};

// exports = module.exports = ComponentLoader;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解析组件的模板
 */

// var warn = require('../util/warn');
// var parseTemplate = require('../parser/parse-template');
// var ExprType = require('../parser/expr-type');
// var createAccessor = require('../parser/create-accessor');



/**
 * 解析组件的模板
 *
 * @param {Function} ComponentClass 组件类
 * @return {ANode}
 */
function parseComponentTemplate(ComponentClass) {
    var proto = ComponentClass.prototype;

    
    var tplANode = parseTemplate(ComponentClass.template || proto.template, {
        trimWhitespace: proto.trimWhitespace || ComponentClass.trimWhitespace,
        delimiters: proto.delimiters || ComponentClass.delimiters
    });

    var aNode = tplANode.children[0];
    if (aNode && aNode.textExpr) {
        aNode = null;
    }

    // #[begin] error
    if (tplANode.children.length !== 1 || !aNode) {
        warn('Component template must have a root element.');
    }
    // #[end]

    aNode = aNode || {
        directives: {},
        props: [],
        events: [],
        children: []
    };

    if (aNode.tagName === 'template') {
        delete aNode.tagName;
    }

    if (proto.autoFillStyleAndId !== false && ComponentClass.autoFillStyleAndId !== false) {
        var extraPropExists = {};

        var len = aNode.props.length;
        while (len--) {
            var prop = aNode.props[len];
            switch (prop.name) {
                case 'class':
                case 'style':
                    extraPropExists[prop.name] = true;
                    prop.expr = {
                        type: 5,
                        expr: createAccessor([{
                            type: 1,
                            value: prop.name
                        }]),
                        filters: [{
                            type: 6,
                            args: [prop.expr],
                            name: createAccessor([{
                                type: 1,
                                value: '_x' + prop.name
                            }])
                        }]
                    }
                    break;

                case 'id':
                    extraPropExists[prop.name] = true;
                
            }
        }

        if (!extraPropExists['class']) {
            aNode.props.push({
                name: 'class',
                expr: {
                    type: 5,
                    expr: createAccessor([{
                        type: 1,
                        value: 'class'
                    }]),
                    filters: [{
                        type: 6,
                        args: [],
                        name: createAccessor([{
                            type: 1,
                            value: '_class'
                        }])
                    }]
                }
            });
        }

        if (!extraPropExists.style) {
            aNode.props.push({
                name: 'style',
                expr: {
                    type: 5,
                    expr: createAccessor([{
                        type: 1,
                        value: 'style'
                    }]),
                    filters: [{
                        type: 6,
                        args: [],
                        name: createAccessor([{
                            type: 1,
                            value: '_style'
                        }])
                    }]
                }
            });
        }

        if (!extraPropExists.id) {
            aNode.props.push({ 
                name: 'id', 
                expr: createAccessor([{
                    type: 1,
                    value: 'id'
                }])
            });
        }
    }

    return aNode;
}

// exports = module.exports = parseComponentTemplate;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 常用标签表，用于 element 创建优化
 */

// var splitStr2Obj = require('../util/split-str-2-obj');

/**
 * 常用标签表
 *
 * @type {Object}
 */
var hotTags = splitStr2Obj(
    'div,span,img,ul,ol,li,dl,dt,dd,a,b,u,hr,'
    + 'form,input,textarea,button,label,select,option,'
    + 'table,tbody,th,tr,td,thead,main,aside,header,footer,nav'
);

// exports = module.exports = hotTags;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 判断是否结束桩
 */

// #[begin] reverse
// /**
//  * 判断是否结束桩
//  *
//  * @param {HTMLElement|HTMLComment} target 要判断的元素
//  * @param {string} type 桩类型
//  * @return {boolean}
//  */
// function isEndStump(target, type) {
//     return target.nodeType === 8 && target.data === '/s-' + type;
// }
// #[end]

// exports = module.exports = isEndStump;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file text 节点类
 */

// var guid = require('../util/guid');
// var isBrowser = require('../browser/is-browser');
// var removeEl = require('../browser/remove-el');
// var insertBefore = require('../browser/insert-before');
// var changeExprCompare = require('../runtime/change-expr-compare');
// var evalExpr = require('../runtime/eval-expr');
// var NodeType = require('./node-type');
// var warnSetHTML = require('./warn-set-html');
// var isEndStump = require('./is-end-stump');
// var getNodePath = require('./get-node-path');


/**
 * text 节点类
 *
 * @class
 * @param {Object} aNode 抽象节点
 * @param {Node} parent 父亲节点
 * @param {Model} scope 所属数据环境
 * @param {Component} owner 所属组件环境
 * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
 */
function TextNode(aNode, parent, scope, owner, reverseWalker) {
    this.aNode = aNode;
    this.owner = owner;
    this.scope = scope;
    this.parent = parent;

    // #[begin] reverse
//     if (reverseWalker) {
//         var currentNode = reverseWalker.current;
//         if (currentNode) {
//             switch (currentNode.nodeType) {
//                 case 8:
//                     if (currentNode.data === 's-text') {
//                         this.id = this.id || guid++;
//                         this.sel = currentNode;
//                         currentNode.data = this.id;
//                         reverseWalker.goNext();
// 
//                         while (1) { // eslint-disable-line
//                             currentNode = reverseWalker.current;
//                             /* istanbul ignore if */
//                             if (!currentNode) {
//                                 throw new Error('[SAN REVERSE ERROR] Text end flag not found. \nPaths: '
//                                     + getNodePath(this).join(' > '));
//                             }
// 
//                             if (isEndStump(currentNode, 'text')) {
//                                 this.el = currentNode;
//                                 reverseWalker.goNext();
//                                 currentNode.data = this.id;
//                                 break;
//                             }
// 
//                             reverseWalker.goNext();
//                         }
//                     }
//                     break;
// 
//                 case 3:
//                     reverseWalker.goNext();
//                     if (!this.aNode.textExpr.original) {
//                         this.el = currentNode;
//                     }
//                     break;
//             }
//         }
//         else {
//             this.el = document.createTextNode('');
//             insertBefore(this.el, reverseWalker.target, reverseWalker.current);
//         }
//     }
    // #[end]
}

TextNode.prototype.nodeType = 1;

/**
 * 将text attach到页面
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
TextNode.prototype.attach = function (parentEl, beforeEl) {
    this.content = evalExpr(this.aNode.textExpr, this.scope, this.owner);
    if (this.content == null) {
        this.content = '';
    }

    if (this.aNode.textExpr.original) {
        this.id = this.id || guid++;
        this.sel = document.createComment(this.id);
        insertBefore(this.sel, parentEl, beforeEl);

        this.el = document.createComment(this.id);
        insertBefore(this.el, parentEl, beforeEl);

        var tempFlag = document.createElement('script');
        parentEl.insertBefore(tempFlag, this.el);
        tempFlag.insertAdjacentHTML('beforebegin', this.content);
        parentEl.removeChild(tempFlag);
    }
    else {
        this.el = document.createTextNode(this.content);
        insertBefore(this.el, parentEl, beforeEl);
    }
};

/**
 * 销毁 text 节点
 *
 * @param {boolean=} noDetach 是否不要把节点从dom移除
 */
TextNode.prototype.dispose = function (noDetach) {
    if (!noDetach) {
        removeEl(this.el);
        removeEl(this.sel);
    }

    this.el = null;
    this.sel = null;
};

var textUpdateProp = isBrowser
    && (typeof document.createTextNode('').textContent === 'string'
        ? 'textContent'
        : 'data');

/**
 * 更新 text 节点的视图
 *
 * @param {Array} changes 数据变化信息
 */
TextNode.prototype._update = function (changes) {
    if (this.aNode.textExpr.value) {
        return;
    }

    var len = changes.length;
    while (len--) {
        if (changeExprCompare(changes[len].expr, this.aNode.textExpr, this.scope)) {
            var text = evalExpr(this.aNode.textExpr, this.scope, this.owner);
            if (text == null) {
                text = '';
            }

            if (text !== this.content) {
                this.content = text;

                if (this.aNode.textExpr.original) {
                    var startRemoveEl = this.sel.nextSibling;
                    var parentEl = this.el.parentNode;

                    while (startRemoveEl !== this.el) {
                        var removeTarget = startRemoveEl;
                        startRemoveEl = startRemoveEl.nextSibling;
                        removeEl(removeTarget);
                    }

                    // #[begin] error
                    warnSetHTML(parentEl);
                    // #[end]

                    var tempFlag = document.createElement('script');
                    parentEl.insertBefore(tempFlag, this.el);
                    tempFlag.insertAdjacentHTML('beforebegin', text);
                    parentEl.removeChild(tempFlag);
                }
                else {
                    this.el[textUpdateProp] = text;
                }
            }

            return;
        }
    }
};

// exports = module.exports = TextNode;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 将没有 root 只有 children 的元素 attach 到页面
 */


// var insertBefore = require('../browser/insert-before');
// var LifeCycle = require('./life-cycle');
// var createNode = require('./create-node');

/**
 * 将没有 root 只有 children 的元素 attach 到页面
 * 主要用于 slot 和 template
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
function nodeOwnOnlyChildrenAttach(parentEl, beforeEl) {
    this.sel = document.createComment(this.id);
    insertBefore(this.sel, parentEl, beforeEl);

    for (var i = 0; i < this.aNode.children.length; i++) {
        var child = createNode(
            this.aNode.children[i],
            this,
            this.childScope || this.scope,
            this.childOwner || this.owner
        );
        this.children.push(child);
        child.attach(parentEl, beforeEl);
    }

    this.el = document.createComment(this.id);
    insertBefore(this.el, parentEl, beforeEl);

    this.lifeCycle = LifeCycle.attached;
}

// exports = module.exports = nodeOwnOnlyChildrenAttach;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file slot 节点类
 */

// var each = require('../util/each');
// var guid = require('../util/guid');
// var extend = require('../util/extend');
// var ExprType = require('../parser/expr-type');
// var createAccessor = require('../parser/create-accessor');
// var evalExpr = require('../runtime/eval-expr');
// var Data = require('../runtime/data');
// var DataChangeType = require('../runtime/data-change-type');
// var changeExprCompare = require('../runtime/change-expr-compare');
// var insertBefore = require('../browser/insert-before');
// var removeEl = require('../browser/remove-el');
// var NodeType = require('./node-type');
// var LifeCycle = require('./life-cycle');
// var getANodeProp = require('./get-a-node-prop');
// var nodeSBindInit = require('./node-s-bind-init');
// var nodeSBindUpdate = require('./node-s-bind-update');
// var createReverseNode = require('./create-reverse-node');
// var elementDisposeChildren = require('./element-dispose-children');
// var nodeOwnOnlyChildrenAttach = require('./node-own-only-children-attach');


/**
 * slot 节点类
 *
 * @class
 * @param {Object} aNode 抽象节点
 * @param {Node} parent 父亲节点
 * @param {Model} scope 所属数据环境
 * @param {Component} owner 所属组件环境
 * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
 */
function SlotNode(aNode, parent, scope, owner, reverseWalker) {
    this.owner = owner;
    this.scope = scope;
    this.parent = parent;
    this.parentComponent = parent.nodeType === 5
        ? parent
        : parent.parentComponent;

    this.id = guid++;

    this.lifeCycle = LifeCycle.start;
    this.children = [];

    // calc slot name
    this.nameBind = getANodeProp(aNode, 'name');
    if (this.nameBind) {
        this.isNamed = true;
        this.name = evalExpr(this.nameBind.expr, this.scope, this.owner);
    }

    // calc aNode children
    var sourceSlots = owner.sourceSlots;
    var matchedSlots;
    if (sourceSlots) {
        matchedSlots = this.isNamed ? sourceSlots.named[this.name] : sourceSlots.noname;
    }

    if (matchedSlots) {
        this.isInserted = true;
    }

    this.aNode = {
        directives: aNode.directives,
        props: [],
        events: [],
        children: matchedSlots || aNode.children.slice(0),
        vars: aNode.vars
    };

    this._sbindData = nodeSBindInit(aNode.directives.bind, this.scope, this.owner);

    // calc scoped slot vars
    var initData;
    if (this._sbindData) {
        initData = extend({}, this._sbindData);
    }

    if (aNode.vars) {
        initData = initData || {};
        each(aNode.vars, function (varItem) {
            initData[varItem.name] = evalExpr(varItem.expr, scope, owner);
        });
    }

    // child owner & child scope
    if (this.isInserted) {
        this.childOwner = owner.owner;
        this.childScope = owner.scope;
    }

    if (initData) {
        this.isScoped = true;
        this.childScope = new Data(initData, this.childScope || this.scope);
    }


    owner.slotChildren.push(this);

    // #[begin] reverse
//     if (reverseWalker) {
//         var hasFlagComment;
// 
//         // start flag
//         if (reverseWalker.current && reverseWalker.current.nodeType === 8) {
//             this.sel = reverseWalker.current;
//             hasFlagComment = 1;
//             reverseWalker.goNext();
//         }
//         else {
//             this.sel = document.createComment(this.id);
//             reverseWalker.current
//                 ? reverseWalker.target.insertBefore(this.sel, reverseWalker.current)
//                 : reverseWalker.target.appendChild(this.sel);
//         }
// 
//         var aNodeChildren = this.aNode.children;
//         for (var i = 0, l = aNodeChildren.length; i < l; i++) {
//             this.children.push(createReverseNode(
//                 aNodeChildren[i],
//                 this,
//                 this.childScope || this.scope,
//                 this.childOwner || this.owner,
//                 reverseWalker
//             ));
//         }
// 
//         // end flag
//         if (hasFlagComment) {
//             this.el = reverseWalker.current;
//             reverseWalker.goNext();
//         }
//         else {
//             this.el = document.createComment(this.id);
//             reverseWalker.current
//                 ? reverseWalker.target.insertBefore(this.el, reverseWalker.current)
//                 : reverseWalker.target.appendChild(this.el);
//         }
// 
//         this.lifeCycle = LifeCycle.attached;
//     }
    // #[end]
}

SlotNode.prototype.nodeType = 6;

/**
 * 销毁释放 slot
 *
 * @param {boolean=} noDetach 是否不要把节点从dom移除
 * @param {boolean=} noTransition 是否不显示过渡动画效果
 */
SlotNode.prototype.dispose = function (noDetach, noTransition) {
    this.childOwner = null;
    this.childScope = null;

    elementDisposeChildren(this.children, noDetach, noTransition);

    if (!noDetach) {
        removeEl(this.el);
        removeEl(this.sel);
    }

    this.sel = null;
    this.el = null;
    this.owner = null;
    this.scope = null;
    this.children = null;

    this.lifeCycle = LifeCycle.disposed;

    if (this._ondisposed) {
        this._ondisposed();
    }
};

SlotNode.prototype.attach = nodeOwnOnlyChildrenAttach;

/**
 * 视图更新函数
 *
 * @param {Array} changes 数据变化信息
 * @param {boolean=} isFromOuter 变化信息是否来源于父组件之外的组件
 * @return {boolean}
 */
SlotNode.prototype._update = function (changes, isFromOuter) {
    var me = this;

    if (this.nameBind && evalExpr(this.nameBind.expr, this.scope, this.owner) !== this.name) {
        this.owner._notifyNeedReload();
        return false;
    }

    if (isFromOuter) {
        if (this.isInserted) {
            for (var i = 0; i < this.children.length; i++) {
                this.children[i]._update(changes);
            }
        }
    }
    else {
        if (this.isScoped) {
            var varKeys = {};
            each(this.aNode.vars, function (varItem) {
                varKeys[varItem.name] = 1;
                me.childScope.set(varItem.name, evalExpr(varItem.expr, me.scope, me.owner));
            });

            var scopedChanges = [];

            this._sbindData = nodeSBindUpdate(
                this.aNode.directives.bind,
                this._sbindData,
                this.scope,
                this.owner,
                changes,
                function (name, value) {
                    if (varKeys[name]) {
                        return;
                    }

                    me.childScope.set(name, value);
                    scopedChanges.push({
                        type: 1,
                        expr: createAccessor([
                            {type: 1, value: name}
                        ]),
                        value: value,
                        option: {}
                    });
                }
            );

            each(changes, function (change) {
                if (!me.isInserted) {
                    scopedChanges.push(change);
                }

                each(me.aNode.vars, function (varItem) {
                    var name = varItem.name;
                    var relation = changeExprCompare(change.expr, varItem.expr, me.scope);

                    if (relation < 1) {
                        return;
                    }

                    if (change.type !== 2) {
                        scopedChanges.push({
                            type: 1,
                            expr: createAccessor([
                                {type: 1, value: name}
                            ]),
                            value: me.childScope.get(name),
                            option: change.option
                        });
                    }
                    else if (relation === 2) {
                        scopedChanges.push({
                            expr: createAccessor([
                                {type: 1, value: name}
                            ]),
                            type: 2,
                            index: change.index,
                            deleteCount: change.deleteCount,
                            value: change.value,
                            insertions: change.insertions,
                            option: change.option
                        });
                    }
                });
            });

            for (var i = 0; i < this.children.length; i++) {
                this.children[i]._update(scopedChanges);
            }
        }
        else if (!this.isInserted) {
            for (var i = 0; i < this.children.length; i++) {
                this.children[i]._update(changes);
            }
        }
    }
};

// exports = module.exports = SlotNode;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file for 指令节点类
 */

// var inherits = require('../util/inherits');
// var each = require('../util/each');
// var guid = require('../util/guid');
// var ExprType = require('../parser/expr-type');
// var parseExpr = require('../parser/parse-expr');
// var createAccessor = require('../parser/create-accessor');
// var Data = require('../runtime/data');
// var DataChangeType = require('../runtime/data-change-type');
// var changeExprCompare = require('../runtime/change-expr-compare');
// var evalExpr = require('../runtime/eval-expr');
// var changesIsInDataRef = require('../runtime/changes-is-in-data-ref');
// var insertBefore = require('../browser/insert-before');
// var NodeType = require('./node-type');
// var createNode = require('./create-node');
// var createReverseNode = require('./create-reverse-node');
// var nodeOwnSimpleDispose = require('./node-own-simple-dispose');
// var nodeOwnCreateStump = require('./node-own-create-stump');


/**
 * 循环项的数据容器类
 *
 * @inner
 * @class
 * @param {Object} forElement for元素对象
 * @param {*} item 当前项的数据
 * @param {number} index 当前项的索引
 */
function ForItemData(forElement, item, index) {
    this.parent = forElement.scope;
    this.raw = {};
    this.listeners = [];

    this.directive = forElement.aNode.directives['for']; // eslint-disable-line dot-notation
    this.indexName = this.directive.index || '$index';

    this.raw[this.directive.item] = item;
    this.raw[this.indexName] = index;
}

/**
 * 将数据操作的表达式，转换成为对parent数据操作的表达式
 * 主要是对item和index进行处理
 *
 * @param {Object} expr 表达式
 * @return {Object}
 */
ForItemData.prototype.exprResolve = function (expr) {
    var me = this;
    var directive = this.directive;

    function resolveItem(expr) {
        if (expr.type === 4 && expr.paths[0].value === directive.item) {
            return createAccessor(
                directive.value.paths.concat(
                    {
                        type: 2,
                        value: me.raw[me.indexName]
                    },
                    expr.paths.slice(1)
                )
            );
        }

        return expr;
    }

    expr = resolveItem(expr);

    var resolvedPaths = [];

    each(expr.paths, function (item) {
        resolvedPaths.push(
            item.type === 4 && item.paths[0].value === me.indexName
                ? {
                    type: 2,
                    value: me.raw[me.indexName]
                }
                : resolveItem(item)
        );
    });

    return createAccessor(resolvedPaths);
};

// 代理数据操作方法
inherits(ForItemData, Data);
each(
    ['set', 'remove', 'unshift', 'shift', 'push', 'pop', 'splice'],
    function (method) {
        ForItemData.prototype['_' + method] = Data.prototype[method];

        ForItemData.prototype[method] = function (expr) {
            expr = this.exprResolve(parseExpr(expr));
            this.parent[method].apply(
                this.parent,
                [expr].concat(Array.prototype.slice.call(arguments, 1))
            );
        };
    }
);

/**
 * for 指令节点类
 *
 * @class
 * @param {Object} aNode 抽象节点
 * @param {Node} parent 父亲节点
 * @param {Model} scope 所属数据环境
 * @param {Component} owner 所属组件环境
 * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
 */
function ForNode(aNode, parent, scope, owner, reverseWalker) {
    this.aNode = aNode;
    this.owner = owner;
    this.scope = scope;
    this.parent = parent;
    this.parentComponent = parent.nodeType === 5
        ? parent
        : parent.parentComponent;

    this.id = guid++;
    this.children = [];

    this.param = aNode.directives['for']; // eslint-disable-line dot-notation

    this.itemPaths = [
        {
            type: 1,
            value: this.param.item
        }
    ];

    this.itemExpr = {
        type: 4,
        paths: this.itemPaths,
        raw: this.param.item
    };

    if (this.param.index) {
        this.indexExpr = createAccessor([{
            type: 1,
            value: '' + this.param.index
        }]);
    }


    // #[begin] reverse
//     if (reverseWalker) {
//         this.listData = evalExpr(this.param.value, this.scope, this.owner);
//         if (this.listData instanceof Array) {
//             for (var i = 0; i < this.listData.length; i++) {
//                 this.children.push(createReverseNode(
//                     this.aNode.forRinsed,
//                     this,
//                     new ForItemData(this, this.listData[i], i),
//                     this.owner,
//                     reverseWalker
//                 ));
//             }
//         }
//         else if (this.listData && typeof this.listData === 'object') {
//             for (var i in this.listData) {
//                 if (this.listData.hasOwnProperty(i) && this.listData[i] != null) {
//                     this.children.push(createReverseNode(
//                         this.aNode.forRinsed,
//                         this,
//                         new ForItemData(this, this.listData[i], i),
//                         this.owner,
//                         reverseWalker
//                     ));
//                 }
//             }
//         }
// 
//         this._create();
//         insertBefore(this.el, reverseWalker.target, reverseWalker.current);
//     }
    // #[end]
}


ForNode.prototype.nodeType = 3;
ForNode.prototype._create = nodeOwnCreateStump;
ForNode.prototype.dispose = nodeOwnSimpleDispose;

/**
 * 将元素attach到页面的行为
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
ForNode.prototype.attach = function (parentEl, beforeEl) {
    this._create();
    insertBefore(this.el, parentEl, beforeEl);
    this.listData = evalExpr(this.param.value, this.scope, this.owner);

    this._createChildren();
};

/**
 * 创建子元素
 */
ForNode.prototype._createChildren = function () {
    var parentEl = this.el.parentNode;
    var listData = this.listData;

    if (listData instanceof Array) {
        for (var i = 0; i < listData.length; i++) {
            var childANode = this.aNode.forRinsed;
            var child = childANode.Clazz
                        ? new childANode.Clazz(childANode, this, new ForItemData(this, listData[i], i), this.owner)
                        : createNode(childANode, this, new ForItemData(this, listData[i], i), this.owner);

            this.children.push(child);
            child.attach(parentEl, this.el);
        }
    }
    else if (listData && typeof listData === 'object') {
        for (var i in listData) {
            if (listData.hasOwnProperty(i) && listData[i] != null) {
                var childANode = this.aNode.forRinsed;
                var child = childANode.Clazz
                        ? new childANode.Clazz(childANode, this, new ForItemData(this, listData[i], i), this.owner)
                        : createNode(childANode, this, new ForItemData(this, listData[i], i), this.owner);
                this.children.push(child);
                child.attach(parentEl, this.el);
            }
        }
    }
};

/* eslint-disable fecs-max-statements */

/**
 * 视图更新函数
 *
 * @param {Array} changes 数据变化信息
 */
ForNode.prototype._update = function (changes) {
    var listData = evalExpr(this.param.value, this.scope, this.owner);
    var oldIsArr = this.listData instanceof Array;
    var newIsArr = listData instanceof Array;

    if (this.children.length) {
        if (!listData || newIsArr && listData.length === 0) {
            this._disposeChildren();
            this.listData = listData;
        }
        else if (oldIsArr !== newIsArr || !newIsArr) {
            // 就是这么暴力
            // 不推荐使用for遍历object，用的话自己负责
            this.listData = listData;

            var isListChanged;
            for (var cIndex = 0; !isListChanged && cIndex < changes.length; cIndex++) {
                isListChanged = changeExprCompare(changes[cIndex].expr, this.param.value, this.scope);
            }
            var dataHotspot = this.aNode.hotspot.data;
            if (isListChanged || dataHotspot && changesIsInDataRef(changes, dataHotspot)) {
                var me = this;
                this._disposeChildren(null, function () {
                    me._createChildren();
                });
            }
        }
        else {
            this._updateArray(changes, listData);
            this.listData = listData;
        }
    }
    else {
        this.listData = listData;
        this._createChildren();
    }
};

/**
 * 销毁释放子元素
 *
 * @param {Array?} children 要销毁的子元素，默认为自身的children
 * @param {Function} callback 释放完成的回调函数
 */
ForNode.prototype._disposeChildren = function (children, callback) {
    var parentEl = this.el.parentNode;
    var parentFirstChild = parentEl.firstChild;
    var parentLastChild = parentEl.lastChild;

    var len = this.children.length;

    var violentClear = !this.aNode.directives.transition
        && !children
        // 是否 parent 的唯一 child
        && len && parentFirstChild === this.children[0].el && parentLastChild === this.el
        ;

    if (!children) {
        children = this.children;
        this.children = [];
    }


    var disposedChildCount = 0;
    len = children.length;

    // 调用入口处已保证此处必有需要被删除的 child
    for (var i = 0; i < len; i++) {
        var disposeChild = children[i];

        if (violentClear) {
            disposeChild && disposeChild.dispose(violentClear, violentClear);
        }
        else if (disposeChild) {
            disposeChild._ondisposed = childDisposed;
            disposeChild.dispose();
        }
        else {
            childDisposed();
        }
    }

    if (violentClear) {
        // #[begin] allua
        /* istanbul ignore next */
        if (ie) {
            parentEl.innerHTML = '';
        }
        else {
            // #[end]
            parentEl.textContent = '';
            // #[begin] allua
        }
        // #[end]

        this.el = document.createComment(this.id);
        parentEl.appendChild(this.el);
        callback && callback();
    }

    function childDisposed() {
        disposedChildCount++;
        if (disposedChildCount >= len) {
            callback && callback();
        }
    }
};

ForNode.prototype.opti = typeof navigator !== 'undefined'
    && /chrome\/[0-9]+/i.test(navigator.userAgent);
/**
 * 数组类型的视图更新
 *
 * @param {Array} changes 数据变化信息
 * @param {Array} newList 新数组数据
 */
ForNode.prototype._updateArray = function (changes, newList) {
    var oldChildrenLen = this.children.length;
    var childrenChanges = new Array(oldChildrenLen);
    var childIsElem = this.children[0].nodeType === 4;

    function pushToChildrenChanges(change) {
        for (var i = 0, l = childrenChanges.length; i < l; i++) {
            (childrenChanges[i] = childrenChanges[i] || []).push(change);
        }
        childrenNeedUpdate = null;
        isOnlyDispose = false;
    }

    var disposeChildren = [];

    // 控制列表是否整体更新的变量
    var isChildrenRebuild;

    //
    var isOnlyDispose = true;

    var childrenNeedUpdate = {};

    var newLen = newList.length;
    var getItemKey = this.aNode.hotspot.getForKey;

    /* eslint-disable no-redeclare */
    for (var cIndex = 0; cIndex < changes.length; cIndex++) {
        var change = changes[cIndex];
        var relation = changeExprCompare(change.expr, this.param.value, this.scope);

        if (!relation) {
            // 无关时，直接传递给子元素更新，列表本身不需要动
            pushToChildrenChanges(change);
        }
        else {
            if (relation > 2) {
                // 变更表达式是list绑定表达式的子项
                // 只需要对相应的子项进行更新
                var changePaths = change.expr.paths;
                var forLen = this.param.value.paths.length;
                var changeIndex = +evalExpr(changePaths[forLen], this.scope, this.owner);

                if (isNaN(changeIndex)) {
                    pushToChildrenChanges(change);
                }
                else if (!isChildrenRebuild) {
                    isOnlyDispose = false;
                    childrenNeedUpdate && (childrenNeedUpdate[changeIndex] = 1);

                    childrenChanges[changeIndex] = childrenChanges[changeIndex] || [];
                    if (this.param.index) {
                        childrenChanges[changeIndex].push(change);
                    }

                    change = change.type === 1
                        ? {
                            type: change.type,
                            expr: createAccessor(
                                this.itemPaths.concat(changePaths.slice(forLen + 1))
                            ),
                            value: change.value,
                            option: change.option
                        }
                        : {
                            index: change.index,
                            deleteCount: change.deleteCount,
                            insertions: change.insertions,
                            type: change.type,
                            expr: createAccessor(
                                this.itemPaths.concat(changePaths.slice(forLen + 1))
                            ),
                            value: change.value,
                            option: change.option
                        };


                    childrenChanges[changeIndex].push(change);

                    if (change.type === 1) {
                        if (this.children[changeIndex]) {
                            this.children[changeIndex].scope._set(
                                change.expr,
                                change.value,
                                {
                                    silent: 1
                                }
                            );
                        }
                        else {
                            // 设置数组项的索引可能超出数组长度，此时需要新增
                            // 比如当前数组只有2项，但是set list[4]
                            this.children[changeIndex] = 0;
                        }
                    }
                    else if (this.children[changeIndex]) {
                        this.children[changeIndex].scope._splice(
                            change.expr,
                            [].concat(change.index, change.deleteCount, change.insertions),
                            {
                                silent: 1
                            }
                        );
                    }
                }
            }
            else if (isChildrenRebuild) {
                continue;
            }
            else if (relation === 2 && change.type === 2
                && (this.owner.updateMode !== 'optimized' || !this.opti || this.aNode.directives.transition)
            ) {
                childrenNeedUpdate = null;

                // 变更表达式是list绑定表达式本身数组的splice操作
                // 此时需要删除部分项，创建部分项
                var changeStart = change.index;
                var deleteCount = change.deleteCount;
                var insertionsLen = change.insertions.length;
                var newCount = insertionsLen - deleteCount;

                if (newCount) {
                    var indexChange = this.param.index
                        ? {
                            type: 1,
                            option: change.option,
                            expr: this.indexExpr
                        }
                        : null;

                    for (var i = changeStart + deleteCount; i < this.children.length; i++) {
                        if (indexChange) {
                            isOnlyDispose = false;
                            (childrenChanges[i] = childrenChanges[i] || []).push(indexChange);
                        }

                        var child = this.children[i];
                        if (child) {
                            child.scope.raw[child.scope.indexName] = i - deleteCount + insertionsLen;
                        }
                    }
                }

                var deleteLen = deleteCount;
                while (deleteLen--) {
                    if (deleteLen < insertionsLen) {
                        isOnlyDispose = false;
                        var i = changeStart + deleteLen;
                        // update
                        (childrenChanges[i] = childrenChanges[i] || []).push({
                            type: 1,
                            option: change.option,
                            expr: this.itemExpr,
                            value: change.insertions[deleteLen]
                        });
                        if (this.children[i]) {
                            this.children[i].scope.raw[this.param.item] = change.insertions[deleteLen];
                        }
                    }
                }

                if (newCount < 0) {
                    disposeChildren = disposeChildren.concat(
                        this.children.splice(changeStart + insertionsLen, -newCount)
                    );
                    childrenChanges.splice(changeStart + insertionsLen, -newCount);
                }
                else if (newCount > 0) {
                    isOnlyDispose = false;
                    var spliceArgs = [changeStart + deleteCount, 0].concat(new Array(newCount));
                    this.children.splice.apply(this.children, spliceArgs);
                    childrenChanges.splice.apply(childrenChanges, spliceArgs);
                }
            }
            else {
                childrenNeedUpdate = null;
                isOnlyDispose = false;

                isChildrenRebuild = 1;

                // 变更表达式是list绑定表达式本身或母项的重新设值
                // 此时需要更新整个列表

                if (getItemKey && newLen && oldChildrenLen) {
                    // 如果设置了trackBy，用lis更新。开始 ====
                    var newListKeys = [];
                    var oldListKeys = [];
                    var newListKeysMap = {};
                    var oldListInNew = [];
                    var oldListKeyIndex = {};

                    for (var i = 0; i < newList.length; i++) {
                        var itemKey = getItemKey(newList[i]);
                        newListKeys.push(itemKey);
                        newListKeysMap[itemKey] = i;
                    };

                    for (var i = 0; i < this.listData.length; i++) {
                        var itemKey = getItemKey(this.listData[i]);

                        oldListKeys.push(itemKey);
                        oldListKeyIndex[itemKey] = i;

                        if (newListKeysMap[itemKey] != null) {
                            oldListInNew[i] = newListKeysMap[itemKey];
                        }
                        else {
                            oldListInNew[i] = -1;
                            disposeChildren.push(this.children[i]);
                        }
                    };

                    var newIndexStart = 0;
                    var newIndexEnd = newLen;
                    var oldIndexStart = 0;
                    var oldIndexEnd = oldChildrenLen;

                    // 优化：从头开始比对新旧 list 项是否相同
                    while (newIndexStart < newLen
                        && oldIndexStart < oldChildrenLen
                        && newListKeys[newIndexStart] === oldListKeys[oldIndexStart]
                    ) {
                        if (this.listData[oldIndexStart] !== newList[newIndexStart]) {
                            this.children[oldIndexStart].scope.raw[this.param.item] = newList[newIndexStart];
                            (childrenChanges[oldIndexStart] = childrenChanges[oldIndexStart] || []).push({
                                type: 1,
                                option: change.option,
                                expr: this.itemExpr,
                                value: newList[newIndexStart]
                            });
                        }

                        // 对list更上级数据的直接设置
                        if (relation < 2) {
                            (childrenChanges[oldIndexStart] = childrenChanges[oldIndexStart] || []).push(change);
                        }

                        newIndexStart++;
                        oldIndexStart++;
                    }

                    var indexChange = this.param.index
                        ? {
                            type: 1,
                            option: change.option,
                            expr: this.indexExpr
                        }
                        : null;

                    // 优化：从尾开始比对新旧 list 项是否相同
                    while (newIndexEnd > newIndexStart && oldIndexEnd > oldIndexStart
                        && newListKeys[newIndexEnd - 1] === oldListKeys[oldIndexEnd - 1]
                    ) {
                        newIndexEnd--;
                        oldIndexEnd--;

                        if (this.listData[oldIndexEnd] !== newList[newIndexEnd]) {
                            // refresh item
                            this.children[oldIndexEnd].scope.raw[this.param.item] = newList[newIndexEnd];
                            (childrenChanges[oldIndexEnd] = childrenChanges[oldIndexEnd] || []).push({
                                type: 1,
                                option: change.option,
                                expr: this.itemExpr,
                                value: newList[newIndexEnd]
                            });
                        }

                        // refresh index
                        if (newIndexEnd !== oldIndexEnd) {
                            this.children[oldIndexEnd].scope.raw[this.children[oldIndexEnd].scope.indexName] = newIndexEnd;

                            if (indexChange) {
                                (childrenChanges[oldIndexEnd] = childrenChanges[oldIndexEnd] || []).push(indexChange);
                            }
                        }

                        // 对list更上级数据的直接设置
                        if (relation < 2) {
                            (childrenChanges[oldIndexEnd] = childrenChanges[oldIndexEnd] || []).push(change);
                        }
                    }

                    var oldListLIS = [];
                    var lisIdx = [];
                    var lisPos = -1;
                    var lisSource = oldListInNew.slice(oldIndexStart, oldIndexEnd);
                    var len = oldIndexEnd - oldIndexStart;
                    var preIdx = new Array(len);

                    for (var i = 0; i < len; i++) {
                        var oldItemInNew = lisSource[i];
                        if (oldItemInNew === -1) {
                            continue;
                        }

                        var rePos = -1;
                        var rePosEnd = oldListLIS.length;

                        if (rePosEnd > 0 && oldListLIS[rePosEnd - 1] <= oldItemInNew) {
                            rePos = rePosEnd - 1;
                        }
                        else {
                            while (rePosEnd - rePos > 1) {
                                var mid = Math.floor((rePos + rePosEnd) / 2);
                                if (oldListLIS[mid] > oldItemInNew) {
                                    rePosEnd = mid;
                                } else {
                                    rePos = mid;
                                }
                            }
                        }

                        if (rePos !== -1) {
                            preIdx[i] = lisIdx[rePos];
                        }

                        if (rePos === lisPos) {
                            lisPos++;
                            oldListLIS[lisPos] = oldItemInNew;
                            lisIdx[lisPos] = i;
                        } else if (oldItemInNew < oldListLIS[rePos + 1]) {
                            oldListLIS[rePos + 1] = oldItemInNew;
                            lisIdx[rePos + 1] = i;
                        }
                    }

                    for (var i = lisIdx[lisPos]; lisPos >= 0; i = preIdx[i], lisPos--) {
                        oldListLIS[lisPos] = i;
                    }

                    var oldListLISPos = oldListLIS.length;
                    var staticPos = oldListLISPos ? oldListInNew[oldListLIS[--oldListLISPos] + oldIndexStart] : -1;

                    var newChildren = [];
                    var newChildrenChanges = [];

                    var beforeEl = this.el;
                    var parentEl = childIsElem && beforeEl.parentNode;
                    for (var i = newLen - 1; i >= 0; i--) {
                        if (i >= newIndexEnd) {
                            newChildren[i] = this.children[oldChildrenLen - newLen + i];
                            newChildrenChanges[i] = childrenChanges[oldChildrenLen - newLen + i];
                            if (childIsElem) {
                                beforeEl = newChildren[i].el;
                            }
                        }
                        else if (i < newIndexStart) {
                            newChildren[i] = this.children[i];
                            newChildrenChanges[i] = childrenChanges[i];
                        }
                        else {
                            var oldListIndex = oldListKeyIndex[newListKeys[i]];
                            var oldListNode = this.children[oldListIndex];

                            if (oldListNode && (childIsElem || i === staticPos)) {
                                var oldScope = oldListNode.scope;

                                // 如果数据本身引用发生变化，设置变更
                                if (this.listData[oldListIndex] !== newList[i]) {
                                    oldScope.raw[this.param.item] = newList[i];
                                    (childrenChanges[oldListIndex] = childrenChanges[oldListIndex] || []).push({
                                        type: 1,
                                        option: change.option,
                                        expr: this.itemExpr,
                                        value: newList[i]
                                    });
                                }

                                // refresh index
                                if (indexChange && i !== oldListIndex) {
                                    oldScope.raw[oldScope.indexName] = i;

                                    if (indexChange) {
                                        (childrenChanges[oldListIndex] = childrenChanges[oldListIndex] || []).push(indexChange);
                                    }
                                }

                                // 对list更上级数据的直接设置
                                if (relation < 2) {
                                    (childrenChanges[oldListIndex] = childrenChanges[oldListIndex] || []).push(change);
                                }

                                newChildren[i] = oldListNode;
                                newChildrenChanges[i] = childrenChanges[oldListIndex];

                                if (i === staticPos) {
                                    staticPos = oldListLISPos ? oldListInNew[oldListLIS[--oldListLISPos] + oldIndexStart] : -1;
                                }
                                else {
                                    parentEl.insertBefore(oldListNode.el, beforeEl);
                                }

                                if (childIsElem) {
                                    beforeEl = oldListNode.el;
                                }
                            }
                            else {
                                oldListNode && disposeChildren.push(oldListNode);
                                newChildren[i] = 0;
                                newChildrenChanges[i] = 0;
                            }
                        }
                    }

                    this.children = newChildren;
                    childrenChanges = newChildrenChanges;
                    // 如果设置了trackBy，用lis更新。结束 ====
                }
                else {
                    // 老的比新的多的部分，标记需要dispose
                    if (oldChildrenLen > newLen) {
                        disposeChildren = disposeChildren.concat(this.children.slice(newLen));
                        childrenChanges = childrenChanges.slice(0, newLen);
                        this.children = this.children.slice(0, newLen);
                    }

                    // 剩下的部分整项变更
                    for (var i = 0; i < newLen; i++) {
                        // 对list更上级数据的直接设置
                        if (relation < 2) {
                            (childrenChanges[i] = childrenChanges[i] || []).push(change);
                        }

                        if (this.children[i]) {
                            if (this.children[i].scope.raw[this.param.item] !== newList[i]) {
                                this.children[i].scope.raw[this.param.item] = newList[i];
                                (childrenChanges[i] = childrenChanges[i] || []).push({
                                    type: 1,
                                    option: change.option,
                                    expr: this.itemExpr,
                                    value: newList[i]
                                });
                            }
                        }
                        else {
                            this.children[i] = 0;
                        }
                    }
                }
            }
        }

    }

    // 标记 length 是否发生变化
    if (newLen !== oldChildrenLen && this.param.value.paths) {
        var lengthChange = {
            type: 1,
            option: {},
            expr: createAccessor(
                this.param.value.paths.concat({
                    type: 1,
                    value: 'length'
                })
            )
        };

        if (changesIsInDataRef([lengthChange], this.aNode.hotspot.data)) {
            pushToChildrenChanges(lengthChange);
        }
    }

    // 执行视图更新，先删再刷新
    this._doCreateAndUpdate = doCreateAndUpdate;

    var me = this;
    if (disposeChildren.length === 0) {
        doCreateAndUpdate();
    }
    else {
        this._disposeChildren(disposeChildren, function () {
            if (doCreateAndUpdate === me._doCreateAndUpdate) {
                doCreateAndUpdate();
            }
        });
    }

    function doCreateAndUpdate() {
        me._doCreateAndUpdate = null;

        if (isOnlyDispose) {
            return;
        }

        var beforeEl = me.el;
        var parentEl = beforeEl.parentNode;

        // 对相应的项进行更新
        // 如果不attached则直接创建，如果存在则调用更新函数
        var j = -1;
        for (var i = 0; i < newLen; i++) {
            var child = me.children[i];

            if (child) {
                if (childrenChanges[i] && (!childrenNeedUpdate || childrenNeedUpdate[i])) {
                    child._update(childrenChanges[i]);
                }
            }
            else {
                if (j < i) {
                    j = i + 1;
                    beforeEl = null;
                    while (j < newLen) {
                        var nextChild = me.children[j];
                        if (nextChild) {
                            beforeEl = nextChild.sel || nextChild.el;
                            break;
                        }
                        j++;
                    }
                }

                me.children[i] = createNode(me.aNode.forRinsed, me, new ForItemData(me, newList[i], i), me.owner);
                me.children[i].attach(parentEl, beforeEl || me.el);
            }
        }
    }
};

// exports = module.exports = ForNode;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file if 指令节点类
 */

// var each = require('../util/each');
// var guid = require('../util/guid');
// var insertBefore = require('../browser/insert-before');
// var evalExpr = require('../runtime/eval-expr');
// var NodeType = require('./node-type');
// var createNode = require('./create-node');
// var createReverseNode = require('./create-reverse-node');
// var nodeOwnCreateStump = require('./node-own-create-stump');
// var nodeOwnSimpleDispose = require('./node-own-simple-dispose');

/**
 * if 指令节点类
 *
 * @class
 * @param {Object} aNode 抽象节点
 * @param {Node} parent 父亲节点
 * @param {Model} scope 所属数据环境
 * @param {Component} owner 所属组件环境
 * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
 */
function IfNode(aNode, parent, scope, owner, reverseWalker) {
    this.aNode = aNode;
    this.owner = owner;
    this.scope = scope;
    this.parent = parent;
    this.parentComponent = parent.nodeType === 5
        ? parent
        : parent.parentComponent;

    this.id = guid++;
    this.children = [];

    // #[begin] reverse
//     if (reverseWalker) {
//         if (evalExpr(this.aNode.directives['if'].value, this.scope, this.owner)) { // eslint-disable-line dot-notation
//             this.elseIndex = -1;
//             this.children[0] = createReverseNode(
//                 this.aNode.ifRinsed,
//                 this,
//                 this.scope,
//                 this.owner,
//                 reverseWalker
//             );
//         }
//         else {
//             var me = this;
//             each(aNode.elses, function (elseANode, index) {
//                 var elif = elseANode.directives.elif;
// 
//                 if (!elif || elif && evalExpr(elif.value, me.scope, me.owner)) {
//                     me.elseIndex = index;
//                     me.children[0] = createReverseNode(
//                         elseANode,
//                         me,
//                         me.scope,
//                         me.owner,
//                         reverseWalker
//                     );
//                     return false;
//                 }
//             });
//         }
// 
//         this._create();
//         insertBefore(this.el, reverseWalker.target, reverseWalker.current);
//     }
    // #[end]
}

IfNode.prototype.nodeType = 2;

IfNode.prototype._create = nodeOwnCreateStump;
IfNode.prototype.dispose = nodeOwnSimpleDispose;

/**
 * attach到页面
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
IfNode.prototype.attach = function (parentEl, beforeEl) {
    var me = this;
    var elseIndex;
    var child;

    if (evalExpr(this.aNode.directives['if'].value, this.scope, this.owner)) { // eslint-disable-line dot-notation
        child = createNode(this.aNode.ifRinsed, this, this.scope, this.owner);
        elseIndex = -1;
    }
    else {
        each(this.aNode.elses, function (elseANode, index) {
            var elif = elseANode.directives.elif;

            if (!elif || elif && evalExpr(elif.value, me.scope, me.owner)) {
                child = createNode(elseANode, me, me.scope, me.owner);
                elseIndex = index;
                return false;
            }
        });
    }

    if (child) {
        this.children[0] = child;
        child.attach(parentEl, beforeEl);
        this.elseIndex = elseIndex;
    }


    this._create();
    insertBefore(this.el, parentEl, beforeEl);
};


/**
 * 视图更新函数
 *
 * @param {Array} changes 数据变化信息
 */
IfNode.prototype._update = function (changes) {
    var me = this;
    var childANode = this.aNode.ifRinsed;
    var elseIndex;

    if (evalExpr(this.aNode.directives['if'].value, this.scope, this.owner)) { // eslint-disable-line dot-notation
        elseIndex = -1;
    }
    else {
        each(this.aNode.elses, function (elseANode, index) {
            var elif = elseANode.directives.elif;

            if (elif && evalExpr(elif.value, me.scope, me.owner) || !elif) {
                elseIndex = index;
                childANode = elseANode;
                return false;
            }
        });
    }

    var child = this.children[0];
    if (elseIndex === this.elseIndex) {
        child && child._update(changes);
    }
    else {
        this.children = [];
        if (child) {
            child._ondisposed = newChild;
            child.dispose();
        }
        else {
            newChild();
        }

        this.elseIndex = elseIndex;
    }

    function newChild() {
        if (typeof elseIndex !== 'undefined') {
            (me.children[0] = createNode(childANode, me, me.scope, me.owner))
                .attach(me.el.parentNode, me.el);
        }
    }
};

IfNode.prototype._getElAsRootNode = function () {
    var child = this.children[0];
    return child && child.el || this.el;
};

// exports = module.exports = IfNode;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file template 节点类
 */

// var guid = require('../util/guid');
// var insertBefore = require('../browser/insert-before');
// var removeEl = require('../browser/remove-el');
// var NodeType = require('./node-type');
// var LifeCycle = require('./life-cycle');
// var createReverseNode = require('./create-reverse-node');
// var elementDisposeChildren = require('./element-dispose-children');
// var nodeOwnOnlyChildrenAttach = require('./node-own-only-children-attach');

/**
 * template 节点类
 *
 * @class
 * @param {Object} aNode 抽象节点
 * @param {Node} parent 父亲节点
 * @param {Model} scope 所属数据环境
 * @param {Component} owner 所属组件环境
 * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
 */
function TemplateNode(aNode, parent, scope, owner, reverseWalker) {
    this.aNode = aNode;
    this.owner = owner;
    this.scope = scope;
    this.parent = parent;
    this.parentComponent = parent.nodeType === 5
        ? parent
        : parent.parentComponent;

    this.id = guid++;
    this.lifeCycle = LifeCycle.start;
    this.children = [];

    // #[begin] reverse
//     if (reverseWalker) {
//         var hasFlagComment;
// 
//         // start flag
//         if (reverseWalker.current && reverseWalker.current.nodeType === 8) {
//             this.sel = reverseWalker.current;
//             hasFlagComment = 1;
//             reverseWalker.goNext();
//         }
//         else {
//             this.sel = document.createComment(this.id);
//             insertBefore(this.sel, reverseWalker.target, reverseWalker.current);
//         }
// 
//         // content
//         var aNodeChildren = this.aNode.children;
//         for (var i = 0, l = aNodeChildren.length; i < l; i++) {
//             this.children.push(
//                 createReverseNode(aNodeChildren[i], this, this.scope, this.owner, reverseWalker)
//             );
//         }
// 
//         // end flag
//         if (hasFlagComment) {
//             this.el = reverseWalker.current;
//             reverseWalker.goNext();
//         }
//         else {
//             this.el = document.createComment(this.id);
//             insertBefore(this.el, reverseWalker.target, reverseWalker.current);
//         }
// 
//         this.lifeCycle = LifeCycle.attached;
//     }
    // #[end]
}



TemplateNode.prototype.nodeType = 7;

TemplateNode.prototype.attach = nodeOwnOnlyChildrenAttach;

/**
 * 销毁释放
 *
 * @param {boolean=} noDetach 是否不要把节点从dom移除
 * @param {boolean=} noTransition 是否不显示过渡动画效果
 */
TemplateNode.prototype.dispose = function (noDetach, noTransition) {
    elementDisposeChildren(this.children, noDetach, noTransition);

    if (!noDetach) {
        removeEl(this.el);
        removeEl(this.sel);
    }

    this.sel = null;
    this.el = null;
    this.owner = null;
    this.scope = null;
    this.children = null;

    this.lifeCycle = LifeCycle.disposed;

    if (this._ondisposed) {
        this._ondisposed();
    }
};

/**
 * 视图更新函数
 *
 * @param {Array} changes 数据变化信息
 */
TemplateNode.prototype._update = function (changes) {
    for (var i = 0; i < this.children.length; i++) {
        this.children[i]._update(changes);
    }
};

// exports = module.exports = TemplateNode;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file ANode预热
 */

// var ExprType = require('../parser/expr-type');
// var each = require('../util/each');
// var extend = require('../util/extend');
// var kebab2camel = require('../util/kebab2camel');
// var hotTags = require('../browser/hot-tags');
// var createEl = require('../browser/create-el');
// var getPropHandler = require('./get-prop-handler');
// var getANodeProp = require('./get-a-node-prop');
// var isBrowser = require('../browser/is-browser');
// var TextNode = require('./text-node');
// var SlotNode = require('./slot-node');
// var ForNode = require('./for-node');
// var IfNode = require('./if-node');
// var TemplateNode = require('./template-node');
// var Element = require('./element');

/**
 * ANode预热，分析的数据引用等信息
 *
 * @param {Object} aNode 要预热的ANode
 */
function preheatANode(aNode, componentInstance) {
    var stack = [];

    function recordHotspotData(expr, notContentData) {
        var refs = analyseExprDataHotspot(expr);

        if (refs.length) {
            for (var i = 0, len = stack.length; i < len; i++) {
                if (!notContentData || i !== len - 1) {
                    var data = stack[i].hotspot.data;
                    if (!data) {
                        data = stack[i].hotspot.data = {};
                    }

                    each(refs, function (ref) {
                        data[ref] = 1;
                    });
                }
            }
        }
    }


    function analyseANodeHotspot(aNode) {
        if (!aNode.hotspot) {
            stack.push(aNode);


            if (aNode.textExpr) {
                aNode.hotspot = {};
                aNode.Clazz = TextNode;
                recordHotspotData(aNode.textExpr);
            }
            else {
                var sourceNode;
                if (isBrowser && aNode.tagName
                    && aNode.tagName.indexOf('-') < 0
                    && !/^(template|slot|select|input|option|button|video|audio|canvas|img|embed|object|iframe)$/i.test(aNode.tagName)
                ) {
                    sourceNode = createEl(aNode.tagName);
                }

                aNode.hotspot = {
                    dynamicProps: [],
                    xProps: [],
                    props: {},
                    binds: [],
                    sourceNode: sourceNode
                };


                // === analyse hotspot data: start
                each(aNode.vars, function (varItem) {
                    recordHotspotData(varItem.expr);
                });

                each(aNode.props, function (prop) {
                    aNode.hotspot.binds.push({
                        name: kebab2camel(prop.name),
                        expr: prop.noValue != null
                            ? {type: 3, value: true}
                            : prop.expr,
                        x: prop.x,
                        noValue: prop.noValue
                    });
                    recordHotspotData(prop.expr);
                });

                for (var key in aNode.directives) {
                    /* istanbul ignore else  */
                    if (aNode.directives.hasOwnProperty(key)) {
                        var directive = aNode.directives[key];
                        recordHotspotData(
                            directive.value,
                            !/^(html|bind)$/.test(key)
                        );

                        // init trackBy getKey function
                        if (key === 'for') {
                            var trackBy = directive.trackBy;
                            if (trackBy
                                && trackBy.type === 4
                                && trackBy.paths[0].value === directive.item
                            ) {
                                aNode.hotspot.getForKey = new Function(
                                    directive.item,
                                    'return ' + directive.trackByRaw
                                );
                            }
                        }
                    }
                }

                each(aNode.elses, function (child) {
                    analyseANodeHotspot(child);
                });

                each(aNode.children, function (child) {
                    analyseANodeHotspot(child);
                });
                // === analyse hotspot data: end


                // === analyse hotspot props: start
                each(aNode.props, function (prop, index) {
                    aNode.hotspot.props[prop.name] = index;
                    prop.handler = getPropHandler(aNode.tagName, prop.name);

                    if (prop.expr.value != null) {
                        if (sourceNode) {
                            prop.handler(sourceNode, prop.expr.value, prop.name, aNode);
                        }
                    }
                    else {
                        if (prop.x) {
                            aNode.hotspot.xProps.push(prop);
                        }
                        aNode.hotspot.dynamicProps.push(prop);
                    }
                });

                // ie 下，如果 option 没有 value 属性，select.value = xx 操作不会选中 option
                // 所以没有设置 value 时，默认把 option 的内容作为 value
                if (aNode.tagName === 'option'
                    && !getANodeProp(aNode, 'value')
                    && aNode.children[0]
                ) {
                    var valueProp = {
                        name: 'value',
                        expr: aNode.children[0].textExpr,
                        handler: getPropHandler(aNode.tagName, 'value')
                    };
                    aNode.props.push(valueProp);
                    aNode.hotspot.dynamicProps.push(valueProp);
                    aNode.hotspot.props.value = aNode.props.length - 1;
                }

                if (aNode.directives['if']) { // eslint-disable-line dot-notation
                    aNode.ifRinsed = {
                        children: aNode.children,
                        props: aNode.props,
                        events: aNode.events,
                        tagName: aNode.tagName,
                        vars: aNode.vars,
                        hotspot: aNode.hotspot,
                        directives: extend({}, aNode.directives)
                    };
                    aNode.hotspot.hasRootNode = true;
                    aNode.Clazz = IfNode;
                    aNode = aNode.ifRinsed;
                    aNode.directives['if'] = null; // eslint-disable-line dot-notation
                }

                if (aNode.directives['for']) { // eslint-disable-line dot-notation
                    aNode.forRinsed = {
                        children: aNode.children,
                        props: aNode.props,
                        events: aNode.events,
                        tagName: aNode.tagName,
                        vars: aNode.vars,
                        hotspot: aNode.hotspot,
                        directives: extend({}, aNode.directives)
                    };
                    aNode.hotspot.hasRootNode = true;
                    aNode.Clazz = ForNode;
                    aNode.forRinsed.directives['for'] = null; // eslint-disable-line dot-notation
                    aNode = aNode.forRinsed;
                }

                switch (aNode.tagName) {
                    case 'slot':
                        aNode.Clazz = SlotNode;
                        break;

                    case 'template':
                    case 'fragment':
                        aNode.hotspot.hasRootNode = true;
                        aNode.Clazz = TemplateNode;
                        break;

                    default:
                        if (hotTags[aNode.tagName]) {
                            if (!aNode.directives.is 
                                && (!componentInstance || !componentInstance.components[aNode.tagName])
                            ) {
                                aNode.Clazz = Element;
                            }

                            // #[begin] error
                            if (componentInstance && componentInstance.components[aNode.tagName]) {
                                warn('\`' + aNode.tagName + '\` as sub-component tag is a bad practice.');
                            }
                            // #[end]
                        }
                }
                // === analyse hotspot props: end
            }

            stack.pop();
        }
    }

    if (aNode) {
        analyseANodeHotspot(aNode);
    }
}

/**
 * 分析表达式的数据引用
 *
 * @param {Object} expr 要分析的表达式
 * @return {Array}
 */
function analyseExprDataHotspot(expr, accessorMeanDynamic) {
    var refs = [];
    var isDynamic;

    function analyseExprs(exprs, accessorMeanDynamic) {
        for (var i = 0, l = exprs.length; i < l; i++) {
            refs = refs.concat(analyseExprDataHotspot(exprs[i], accessorMeanDynamic));
            isDynamic = isDynamic || exprs[i].dynamic;
        }
    }

    switch (expr.type) {
        case 4:
            isDynamic = accessorMeanDynamic;

            var paths = expr.paths;
            refs.push(paths[0].value);

            if (paths.length > 1) {
                refs.push(paths[0].value + '.' + (paths[1].value || '*'));
            }

            analyseExprs(paths.slice(1), 1);
            break;

        case 9:
            refs = analyseExprDataHotspot(expr.expr, accessorMeanDynamic);
            isDynamic = expr.expr.dynamic;
            break;

        case 7:
        case 8:
        case 10:
            analyseExprs(expr.segs, accessorMeanDynamic);
            break;

        case 5:
            refs = analyseExprDataHotspot(expr.expr);
            isDynamic = expr.expr.dynamic;

            each(expr.filters, function (filter) {
                analyseExprs(filter.name.paths);
                analyseExprs(filter.args);
            });

            break;

        case 6:
            analyseExprs(expr.name.paths);
            analyseExprs(expr.args);
            break;

        case 12:
        case 11:
            for (var i = 0; i < expr.items.length; i++) {
                refs = refs.concat(analyseExprDataHotspot(expr.items[i].expr));
                isDynamic = isDynamic || expr.items[i].expr.dynamic;
            }
            break;
    }

    isDynamic && (expr.dynamic = true);
    return refs;
}

// exports = module.exports = preheatANode;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 创建组件Loader
 */

// var ComponentLoader = require('./component-loader');

/**
 * 创建组件Loader
 *
 * @param {Object|Function} options 创建组件Loader的参数。为Object时参考下方描述，为Function时代表load方法。
 * @param {Function} options.load load方法
 * @param {Function=} options.placeholder loading过程中渲染的占位组件
 * @param {Function=} options.fallback load失败时渲染的组件
 * @return {ComponentLoader}
 */
function createComponentLoader(options) {
    var placeholder = options.placeholder;
    var fallback = options.fallback;
    var load = typeof options === 'function' ? options : options.load;

    return new ComponentLoader(load, placeholder, fallback);
}

// exports = module.exports = createComponentLoader;

    /* eslint-disable no-unused-vars */
//     var nextTick = require('./util/next-tick');
//     var inherits = require('./util/inherits');
//     var parseTemplate = require('./parser/parse-template');
//     var parseExpr = require('./parser/parse-expr');
//     var ExprType = require('./parser/expr-type');
//     var unpackANode = require('./parser/unpack-anode');
//     var LifeCycle = require('./view/life-cycle');
//     var NodeType = require('./view/node-type');
//     var Component = require('./view/component');
//     var parseComponentTemplate = require('./view/parse-component-template');
//     var defineComponent = require('./view/define-component');
//     var createComponentLoader = require('./view/create-component-loader');
//     var emitDevtool = require('./util/emit-devtool');
//     var Data = require('./runtime/data');
//     var evalExpr = require('./runtime/eval-expr');
//     var DataTypes = require('./util/data-types');


    var san = {
        /**
         * san版本号
         *
         * @type {string}
         */
        version: '3.10.0',

        // #[begin] devtool
        /**
         * 是否开启调试。开启调试时 devtool 会工作
         *
         * @type {boolean}
         */
        debug: true,
        // #[end]

        /**
         * 组件基类
         *
         * @type {Function}
         */
        Component: Component,

        /**
         * 创建组件类
         *
         * @param {Object} proto 组件类的方法表
         * @return {Function}
         */
        defineComponent: defineComponent,

        /**
         * 创建组件Loader
         *
         * @param {Object|Function} options 创建组件Loader的参数。为Object时参考下方描述，为Function时代表load方法。
         * @param {Function} options.load load方法
         * @param {Function=} options.placeholder loading过程中渲染的占位组件
         * @param {Function=} options.fallback load失败时渲染的组件
         * @return {ComponentLoader}
         */
        createComponentLoader: createComponentLoader,

        /**
         * 解析组件 template
         *
         * @param {Function} ComponentClass 组件类
         * @return {ANode}
         */
        parseComponentTemplate: parseComponentTemplate,

        /**
         * 解压缩 ANode
         *
         * @param {Array} source ANode 压缩数据
         * @return {Object}
         */
        unpackANode: unpackANode,

        /**
         * 解析 template
         *
         * @inner
         * @param {string} source template 源码
         * @return {ANode}
         */
        parseTemplate: parseTemplate,

        /**
         * 解析表达式
         *
         * @param {string} source 源码
         * @return {Object}
         */
        parseExpr: parseExpr,

        /**
         * 表达式类型枚举
         *
         * @const
         * @type {Object}
         */
        ExprType: ExprType,

        /**
         * 生命周期
         */
        LifeCycle: LifeCycle,

        /**
         * 节点类型
         *
         * @const
         * @type {Object}
         */
        NodeType: NodeType,

        /**
         * 在下一个更新周期运行函数
         *
         * @param {Function} fn 要运行的函数
         */
        nextTick: nextTick,

        /**
         * 数据类
         *
         * @class
         * @param {Object?} data 初始数据
         * @param {Data?} parent 父级数据对象
         */
        Data: Data,

        /**
         * 计算表达式的值
         *
         * @param {Object} expr 表达式对象
         * @param {Data} data 数据对象
         * @param {Component=} owner 组件对象，用于表达式中filter的执行
         * @return {*}
         */
        evalExpr: evalExpr,

        /**
         * 构建类之间的继承关系
         *
         * @param {Function} subClass 子类函数
         * @param {Function} superClass 父类函数
         */
        inherits: inherits,

        /**
         * DataTypes
         *
         * @type {Object}
         */
        DataTypes: DataTypes
    };

    // export
    if (true) {
        // For CommonJS
        exports = module.exports = san;
    }
    else {}

    // #[begin] devtool
    emitDevtool.start(san);
    // #[end]
})(this);
//@ sourceMappingURL=san.spa.dev.js.map

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/lib/Store.js":
/*!**************************!*\
  !*** ./src/lib/Store.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

__webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");

__webpack_require__(/*! core-js/modules/es.object.keys */ "./node_modules/core-js/modules/es.object.keys.js");

__webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.reflect.construct */ "./node_modules/core-js/modules/es.reflect.construct.js");

__webpack_require__(/*! core-js/modules/es.regexp.to-string */ "./node_modules/core-js/modules/es.regexp.to-string.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Store", {
  enumerable: true,
  get: function get() {
    return _sanStore.Store;
  }
});
exports.connect = exports.store = void 0;

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _sanStore = __webpack_require__(/*! san-store */ "./node_modules/san-store/dist/san-store.source.js");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var createConnector = _sanStore.connect.createConnector;

var NewStore = /*#__PURE__*/function (_Store) {
  (0, _inherits2.default)(NewStore, _Store);

  var _super = _createSuper(NewStore);

  function NewStore(options) {
    (0, _classCallCheck2.default)(this, NewStore);
    return _super.call(this, options);
  }
  /**
   * 初始化数据
   * @param {Object} data 初始化数据
   */


  (0, _createClass2.default)(NewStore, [{
    key: "initData",
    value: function initData(data) {
      // 这里有风险，如果 store 类的实现变了名称，会影响
      // 升级注意！
      if ((0, _typeof2.default)(data) === 'object') {
        var raw = this.raw;
        Object.keys(data).forEach(function (name) {
          if (raw[name]) {
            throw new Error('Store.initData: ' + name + ' exists!');
          } else {
            // console.log(name)
            raw[name] = data[name];
          }
        });
      }

      return this;
    }
    /**
     * 批量添加action
     * @param  {Object} actions 添加的action数据，key：function
     */

  }, {
    key: "addActions",
    value: function addActions(actions) {
      var addAction = this.addAction.bind(this);

      if ((0, _typeof2.default)(actions) === 'object') {
        Object.keys(actions).forEach(function (name) {
          addAction(name, actions[name]);
        });
      } else {
        throw new Error('Store.addActions: actions type should be an object');
      }

      return this;
    }
  }]);
  return NewStore;
}(_sanStore.Store);
/**
 * 默认的全局 Store 实例
 * 通常我们认为在一个应用应该具有一个全局唯一的 store，管理整个应用状态
 *
 * @type {Store}
 */


var store = new NewStore({
  name: '__default__'
});
exports.store = store;
var connect = {
  san: createConnector(store),
  createConnector: createConnector
};
exports.connect = connect;

/***/ }),

/***/ "./src/lib/utils/patchSan.js":
/*!***********************************!*\
  !*** ./src/lib/utils/patchSan.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Store = __webpack_require__(/*! @/lib/Store */ "./src/lib/Store.js");

var _san = __webpack_require__(/*! san */ "./node_modules/san/dist/san.spa.dev.js");

/**
 * @file 将 storeDispatch 放到 Component 原型上；
 */
// Component 上的 dispatch 指示为 store 的 dispatch；
_san.Component.prototype.storeDispatch = _Store.store.dispatch.bind(_Store.store); // 删除空白节点，听说能提升性能

_san.Component.prototype.trimWhitespace = 'all';

/***/ }),

/***/ "./src/pages/kangyi/containers/ssr/index.js":
/*!**************************************************!*\
  !*** ./src/pages/kangyi/containers/ssr/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _interopRequireDefault = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

__webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.reflect.construct */ "./node_modules/core-js/modules/es.reflect.construct.js");

__webpack_require__(/*! core-js/modules/es.regexp.to-string */ "./node_modules/core-js/modules/es.regexp.to-string.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "processInitData", {
  enumerable: true,
  get: function get() {
    return _processInitData.default;
  }
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _san = __webpack_require__(/*! san */ "./node_modules/san/dist/san.spa.dev.js");

__webpack_require__(/*! @/lib/utils/patchSan */ "./src/lib/utils/patchSan.js");

var _processInitData = _interopRequireDefault(__webpack_require__(/*! @/pages/kangyi/store/processInitData */ "./src/pages/kangyi/store/processInitData.js"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var SSRContent = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(SSRContent, _Component);

  var _super = _createSuper(SSRContent);

  function SSRContent() {
    (0, _classCallCheck2.default)(this, SSRContent);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(SSRContent, [{
    key: "initData",
    value: function initData() {
      return {};
    }
  }, {
    key: "inited",
    value: function inited() {}
  }]);
  return SSRContent;
}(_san.Component);

exports.default = SSRContent;
(0, _defineProperty2.default)(SSRContent, "template",
/* html */
"\n        <div id=\"ssr-content-wrapper\">\n            hello!!! {{main.title}}\n        </div>\n    ");
(0, _defineProperty2.default)(SSRContent, "components", {});

if (true) {
  var __HOT_API__ = __webpack_require__(/*! ./node_modules/san-hot-loader/lib/runtime/component-client-api.js */ "./node_modules/san-hot-loader/lib/runtime/component-client-api.js");

  var __HOT_UTILS__ = __webpack_require__(/*! ./node_modules/san-hot-loader/lib/runtime/utils.js */ "./node_modules/san-hot-loader/lib/runtime/utils.js");

  var __SAN_COMPONENT__ = __HOT_UTILS__.getExports(module);

  if (__SAN_COMPONENT__.template || __SAN_COMPONENT__.prototype.template) {
    module.hot.accept();

    __HOT_API__.install(__webpack_require__(/*! san */ "./node_modules/san/dist/san.spa.dev.js"));

    var __HMR_ID__ = '2898aa38';

    if (!module.hot.data) {
      __HOT_API__.createRecord(__HMR_ID__, __SAN_COMPONENT__);
    } else {
      __HOT_API__.hotReload(__HMR_ID__, __SAN_COMPONENT__);
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/pages/kangyi/store/main.js":
/*!****************************************!*\
  !*** ./src/pages/kangyi/store/main.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  init: function init(data) {
    return {
      title: data.data.title
    };
  }
};
exports.default = _default;

/***/ }),

/***/ "./src/pages/kangyi/store/processInitData.js":
/*!***************************************************!*\
  !*** ./src/pages/kangyi/store/processInitData.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _stores = _interopRequireDefault(__webpack_require__(/*! ./stores */ "./src/pages/kangyi/store/stores.js"));

/**
 * @file store 数据初始化
 */

/**
 * SSR 也需要用到，保持简单纯粹
 * @param data {Object} 传入的标准数据new.d.ts结构
 * @param urlQuery {Object} url参数
 * @return 初始化的StoreNews对象数据
 */
var processInitData = function processInitData() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var urlQuery = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var finalData = {}; // eslint-disable-next-line guard-for-in, no-unused-vars

  for (var key in _stores.default) {
    if (typeof _stores.default[key].init === 'function') {
      finalData[key] = _stores.default[key].init(data, urlQuery);
    } else {
      finalData[key] = _stores.default[key];
    }
  }

  return finalData;
};

var _default = processInitData;
exports.default = _default;

/***/ }),

/***/ "./src/pages/kangyi/store/stores.js":
/*!******************************************!*\
  !*** ./src/pages/kangyi/store/stores.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _main = _interopRequireDefault(__webpack_require__(/*! ./main */ "./src/pages/kangyi/store/main.js"));

var _default = {
  main: _main.default
};
exports.default = _default;

/***/ }),

/***/ 4:
/*!********************************************************!*\
  !*** multi ./src/pages/kangyi/containers/ssr/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/liaohuanyu/projects/baidu-work/baidu/feed3/multi-pages/src/pages/kangyi/containers/ssr/index.js */"./src/pages/kangyi/containers/ssr/index.js");


/***/ })

/******/ });