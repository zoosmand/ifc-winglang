"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// ../../.nvm/versions/node/v20.10.0/lib/node_modules/winglang/node_modules/constructs/lib/dependency.js
var require_dependency = __commonJS({
  "../../.nvm/versions/node/v20.10.0/lib/node_modules/winglang/node_modules/constructs/lib/dependency.js"(exports2) {
    "use strict";
    var _a;
    var _b;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Dependable = exports2.DependencyGroup = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var DependencyGroup = class {
      static {
        __name(this, "DependencyGroup");
      }
      constructor(...deps) {
        this._deps = new Array();
        const self = this;
        Dependable.implement(this, {
          get dependencyRoots() {
            const result = new Array();
            for (const d of self._deps) {
              result.push(...Dependable.of(d).dependencyRoots);
            }
            return result;
          }
        });
        this.add(...deps);
      }
      /**
       * Add a construct to the dependency roots
       */
      add(...scopes) {
        this._deps.push(...scopes);
      }
    };
    _a = JSII_RTTI_SYMBOL_1;
    DependencyGroup[_a] = { fqn: "constructs.DependencyGroup", version: "10.3.0" };
    exports2.DependencyGroup = DependencyGroup;
    var DEPENDABLE_SYMBOL = Symbol.for("@aws-cdk/core.DependableTrait");
    var Dependable = class {
      static {
        __name(this, "Dependable");
      }
      /**
       * Turn any object into an IDependable.
       */
      static implement(instance, trait) {
        instance[DEPENDABLE_SYMBOL] = trait;
      }
      /**
       * Return the matching Dependable for the given class instance.
       */
      static of(instance) {
        const ret = instance[DEPENDABLE_SYMBOL];
        if (!ret) {
          throw new Error(`${instance} does not implement IDependable. Use "Dependable.implement()" to implement`);
        }
        return ret;
      }
      /**
       * Return the matching Dependable for the given class instance.
       * @deprecated use `of`
       */
      static get(instance) {
        return this.of(instance);
      }
    };
    _b = JSII_RTTI_SYMBOL_1;
    Dependable[_b] = { fqn: "constructs.Dependable", version: "10.3.0" };
    exports2.Dependable = Dependable;
  }
});

// ../../.nvm/versions/node/v20.10.0/lib/node_modules/winglang/node_modules/constructs/lib/private/stack-trace.js
var require_stack_trace = __commonJS({
  "../../.nvm/versions/node/v20.10.0/lib/node_modules/winglang/node_modules/constructs/lib/private/stack-trace.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.captureStackTrace = void 0;
    function captureStackTrace(below) {
      below = below || captureStackTrace;
      const object = { stack: "" };
      const previousLimit = Error.stackTraceLimit;
      try {
        Error.stackTraceLimit = Number.MAX_SAFE_INTEGER;
        Error.captureStackTrace(object, below);
      } finally {
        Error.stackTraceLimit = previousLimit;
      }
      if (!object.stack) {
        return [];
      }
      return object.stack.split("\n").slice(1).map((s) => s.replace(/^\s*at\s+/, ""));
    }
    __name(captureStackTrace, "captureStackTrace");
    exports2.captureStackTrace = captureStackTrace;
  }
});

// ../../.nvm/versions/node/v20.10.0/lib/node_modules/winglang/node_modules/constructs/lib/private/uniqueid.js
var require_uniqueid = __commonJS({
  "../../.nvm/versions/node/v20.10.0/lib/node_modules/winglang/node_modules/constructs/lib/private/uniqueid.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.addressOf = void 0;
    var crypto = require("crypto");
    var HIDDEN_ID = "Default";
    function addressOf(components) {
      const hash = crypto.createHash("sha1");
      for (const c of components) {
        if (c === HIDDEN_ID) {
          continue;
        }
        hash.update(c);
        hash.update("\n");
      }
      return "c8" + hash.digest("hex");
    }
    __name(addressOf, "addressOf");
    exports2.addressOf = addressOf;
  }
});

// ../../.nvm/versions/node/v20.10.0/lib/node_modules/winglang/node_modules/constructs/lib/construct.js
var require_construct = __commonJS({
  "../../.nvm/versions/node/v20.10.0/lib/node_modules/winglang/node_modules/constructs/lib/construct.js"(exports2) {
    "use strict";
    var _a;
    var _b;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ConstructOrder = exports2.Construct = exports2.Node = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var dependency_1 = require_dependency();
    var stack_trace_1 = require_stack_trace();
    var uniqueid_1 = require_uniqueid();
    var CONSTRUCT_SYM = Symbol.for("constructs.Construct");
    var Node = class _Node {
      static {
        __name(this, "Node");
      }
      /**
       * Returns the node associated with a construct.
       * @param construct the construct
       *
       * @deprecated use `construct.node` instead
       */
      static of(construct) {
        return construct.node;
      }
      constructor(host, scope, id) {
        this.host = host;
        this._locked = false;
        this._children = {};
        this._context = {};
        this._metadata = new Array();
        this._dependencies = /* @__PURE__ */ new Set();
        this._validations = new Array();
        id = id ?? "";
        this.id = sanitizeId(id);
        this.scope = scope;
        if (scope && !this.id) {
          throw new Error("Only root constructs may have an empty ID");
        }
        scope?.node.addChild(host, this.id);
      }
      /**
       * The full, absolute path of this construct in the tree.
       *
       * Components are separated by '/'.
       */
      get path() {
        const components = [];
        for (const scope of this.scopes) {
          if (scope.node.id) {
            components.push(scope.node.id);
          }
        }
        return components.join(_Node.PATH_SEP);
      }
      /**
       * Returns an opaque tree-unique address for this construct.
       *
       * Addresses are 42 characters hexadecimal strings. They begin with "c8"
       * followed by 40 lowercase hexadecimal characters (0-9a-f).
       *
       * Addresses are calculated using a SHA-1 of the components of the construct
       * path.
       *
       * To enable refactorings of construct trees, constructs with the ID `Default`
       * will be excluded from the calculation. In those cases constructs in the
       * same tree may have the same addreess.
       *
       * @example c83a2846e506bcc5f10682b564084bca2d275709ee
       */
      get addr() {
        if (!this._addr) {
          this._addr = (0, uniqueid_1.addressOf)(this.scopes.map((c) => c.node.id));
        }
        return this._addr;
      }
      /**
       * Return a direct child by id, or undefined
       *
       * @param id Identifier of direct child
       * @returns the child if found, or undefined
       */
      tryFindChild(id) {
        return this._children[sanitizeId(id)];
      }
      /**
       * Return a direct child by id
       *
       * Throws an error if the child is not found.
       *
       * @param id Identifier of direct child
       * @returns Child with the given id.
       */
      findChild(id) {
        const ret = this.tryFindChild(id);
        if (!ret) {
          throw new Error(`No child with id: '${id}'`);
        }
        return ret;
      }
      /**
       * Returns the child construct that has the id `Default` or `Resource"`.
       * This is usually the construct that provides the bulk of the underlying functionality.
       * Useful for modifications of the underlying construct that are not available at the higher levels.
       *
       * @throws if there is more than one child
       * @returns a construct or undefined if there is no default child
       */
      get defaultChild() {
        if (this._defaultChild !== void 0) {
          return this._defaultChild;
        }
        const resourceChild = this.tryFindChild("Resource");
        const defaultChild = this.tryFindChild("Default");
        if (resourceChild && defaultChild) {
          throw new Error(`Cannot determine default child for ${this.path}. There is both a child with id "Resource" and id "Default"`);
        }
        return defaultChild || resourceChild;
      }
      /**
       * Override the defaultChild property.
       *
       * This should only be used in the cases where the correct
       * default child is not named 'Resource' or 'Default' as it
       * should be.
       *
       * If you set this to undefined, the default behavior of finding
       * the child named 'Resource' or 'Default' will be used.
       */
      set defaultChild(value) {
        this._defaultChild = value;
      }
      /**
       * All direct children of this construct.
       */
      get children() {
        return Object.values(this._children);
      }
      /**
       * Return this construct and all of its children in the given order
       */
      findAll(order = ConstructOrder.PREORDER) {
        const ret = new Array();
        visit(this.host);
        return ret;
        function visit(c) {
          if (order === ConstructOrder.PREORDER) {
            ret.push(c);
          }
          for (const child of c.node.children) {
            visit(child);
          }
          if (order === ConstructOrder.POSTORDER) {
            ret.push(c);
          }
        }
        __name(visit, "visit");
      }
      /**
       * This can be used to set contextual values.
       * Context must be set before any children are added, since children may consult context info during construction.
       * If the key already exists, it will be overridden.
       * @param key The context key
       * @param value The context value
       */
      setContext(key, value) {
        if (this.children.length > 0) {
          const names = this.children.map((c) => c.node.id);
          throw new Error("Cannot set context after children have been added: " + names.join(","));
        }
        this._context[key] = value;
      }
      /**
       * Retrieves a value from tree context if present. Otherwise, would throw an error.
       *
       * Context is usually initialized at the root, but can be overridden at any point in the tree.
       *
       * @param key The context key
       * @returns The context value or throws error if there is no context value for this key
       */
      getContext(key) {
        const value = this._context[key];
        if (value !== void 0) {
          return value;
        }
        if (value === void 0 && !this.scope?.node) {
          throw new Error(`No context value present for ${key} key`);
        }
        return this.scope && this.scope.node.getContext(key);
      }
      /**
       * Retrieves the all context of a node from tree context.
       *
       * Context is usually initialized at the root, but can be overridden at any point in the tree.
       *
       * @param defaults Any keys to override the retrieved context
       * @returns The context object or an empty object if there is discovered context
       */
      getAllContext(defaults) {
        if (typeof defaults === "undefined") {
          defaults = {};
        }
        if (this.scope === void 0) {
          return defaults;
        }
        const value = { ...this._context, ...defaults };
        return this.scope && this.scope.node.getAllContext(value);
      }
      /**
       * Retrieves a value from tree context.
       *
       * Context is usually initialized at the root, but can be overridden at any point in the tree.
       *
       * @param key The context key
       * @returns The context value or `undefined` if there is no context value for this key.
       */
      tryGetContext(key) {
        const value = this._context[key];
        if (value !== void 0) {
          return value;
        }
        return this.scope && this.scope.node.tryGetContext(key);
      }
      /**
       * An immutable array of metadata objects associated with this construct.
       * This can be used, for example, to implement support for deprecation notices, source mapping, etc.
       */
      get metadata() {
        return [...this._metadata];
      }
      /**
       * Adds a metadata entry to this construct.
       * Entries are arbitrary values and will also include a stack trace to allow tracing back to
       * the code location for when the entry was added. It can be used, for example, to include source
       * mapping in CloudFormation templates to improve diagnostics.
       *
       * @param type a string denoting the type of metadata
       * @param data the value of the metadata (can be a Token). If null/undefined, metadata will not be added.
       * @param options options
       */
      addMetadata(type, data, options = {}) {
        if (data == null) {
          return;
        }
        const shouldTrace = options.stackTrace ?? false;
        const trace = shouldTrace ? (0, stack_trace_1.captureStackTrace)(options.traceFromFunction ?? this.addMetadata) : void 0;
        this._metadata.push({ type, data, trace });
      }
      /**
       * All parent scopes of this construct.
       *
       * @returns a list of parent scopes. The last element in the list will always
       * be the current construct and the first element will be the root of the
       * tree.
       */
      get scopes() {
        const ret = new Array();
        let curr = this.host;
        while (curr) {
          ret.unshift(curr);
          curr = curr.node.scope;
        }
        return ret;
      }
      /**
       * Returns the root of the construct tree.
       * @returns The root of the construct tree.
       */
      get root() {
        return this.scopes[0];
      }
      /**
       * Returns true if this construct or the scopes in which it is defined are
       * locked.
       */
      get locked() {
        if (this._locked) {
          return true;
        }
        if (this.scope && this.scope.node.locked) {
          return true;
        }
        return false;
      }
      /**
       * Add an ordering dependency on another construct.
       *
       * An `IDependable`
       */
      addDependency(...deps) {
        for (const d of deps) {
          this._dependencies.add(d);
        }
      }
      /**
       * Return all dependencies registered on this node (non-recursive).
       */
      get dependencies() {
        const result = new Array();
        for (const dep of this._dependencies) {
          for (const root of dependency_1.Dependable.of(dep).dependencyRoots) {
            result.push(root);
          }
        }
        return result;
      }
      /**
       * Remove the child with the given name, if present.
       *
       * @returns Whether a child with the given name was deleted.
       * @experimental
       */
      tryRemoveChild(childName) {
        if (!(childName in this._children)) {
          return false;
        }
        delete this._children[childName];
        return true;
      }
      /**
       * Adds a validation to this construct.
       *
       * When `node.validate()` is called, the `validate()` method will be called on
       * all validations and all errors will be returned.
       *
       * @param validation The validation object
       */
      addValidation(validation) {
        this._validations.push(validation);
      }
      /**
       * Validates this construct.
       *
       * Invokes the `validate()` method on all validations added through
       * `addValidation()`.
       *
       * @returns an array of validation error messages associated with this
       * construct.
       */
      validate() {
        const deprecated = ["validate", "onValidate", "synthesize", "onSynthesize", "prepare", "onPrepare"];
        for (const method of deprecated) {
          if (typeof this.host[method] === "function") {
            throw new Error(`the construct "${this.path}" has a "${method}()" method which is no longer supported. Use "construct.node.addValidation()" to add validations to a construct`);
          }
        }
        const errors = new Array();
        for (const v of this._validations) {
          errors.push(...v.validate());
        }
        return errors;
      }
      /**
       * Locks this construct from allowing more children to be added. After this
       * call, no more children can be added to this construct or to any children.
       */
      lock() {
        this._locked = true;
      }
      /**
       * Adds a child construct to this node.
       *
       * @param child The child construct
       * @param childName The type name of the child construct.
       * @returns The resolved path part name of the child
       */
      addChild(child, childName) {
        if (this.locked) {
          if (!this.path) {
            throw new Error("Cannot add children during synthesis");
          }
          throw new Error(`Cannot add children to "${this.path}" during synthesis`);
        }
        if (this._children[childName]) {
          const name = this.id ?? "";
          const typeName = this.host.constructor.name;
          throw new Error(`There is already a Construct with name '${childName}' in ${typeName}${name.length > 0 ? " [" + name + "]" : ""}`);
        }
        this._children[childName] = child;
      }
    };
    _a = JSII_RTTI_SYMBOL_1;
    Node[_a] = { fqn: "constructs.Node", version: "10.3.0" };
    Node.PATH_SEP = "/";
    exports2.Node = Node;
    var Construct = class {
      static {
        __name(this, "Construct");
      }
      /**
       * Checks if `x` is a construct.
       *
       * Use this method instead of `instanceof` to properly detect `Construct`
       * instances, even when the construct library is symlinked.
       *
       * Explanation: in JavaScript, multiple copies of the `constructs` library on
       * disk are seen as independent, completely different libraries. As a
       * consequence, the class `Construct` in each copy of the `constructs` library
       * is seen as a different class, and an instance of one class will not test as
       * `instanceof` the other class. `npm install` will not create installations
       * like this, but users may manually symlink construct libraries together or
       * use a monorepo tool: in those cases, multiple copies of the `constructs`
       * library can be accidentally installed, and `instanceof` will behave
       * unpredictably. It is safest to avoid using `instanceof`, and using
       * this type-testing method instead.
       *
       * @returns true if `x` is an object created from a class which extends `Construct`.
       * @param x Any object
       */
      static isConstruct(x) {
        return x && typeof x === "object" && x[CONSTRUCT_SYM];
      }
      /**
       * Creates a new construct node.
       *
       * @param scope The scope in which to define this construct
       * @param id The scoped construct ID. Must be unique amongst siblings. If
       * the ID includes a path separator (`/`), then it will be replaced by double
       * dash `--`.
       */
      constructor(scope, id) {
        this.node = new Node(this, scope, id);
        dependency_1.Dependable.implement(this, {
          dependencyRoots: [this]
        });
      }
      /**
       * Returns a string representation of this construct.
       */
      toString() {
        return this.node.path || "<root>";
      }
    };
    _b = JSII_RTTI_SYMBOL_1;
    Construct[_b] = { fqn: "constructs.Construct", version: "10.3.0" };
    exports2.Construct = Construct;
    var ConstructOrder;
    (function(ConstructOrder2) {
      ConstructOrder2[ConstructOrder2["PREORDER"] = 0] = "PREORDER";
      ConstructOrder2[ConstructOrder2["POSTORDER"] = 1] = "POSTORDER";
    })(ConstructOrder = exports2.ConstructOrder || (exports2.ConstructOrder = {}));
    var PATH_SEP_REGEX = new RegExp(`${Node.PATH_SEP}`, "g");
    function sanitizeId(id) {
      return id.replace(PATH_SEP_REGEX, "--");
    }
    __name(sanitizeId, "sanitizeId");
    Object.defineProperty(Construct.prototype, CONSTRUCT_SYM, {
      value: true,
      enumerable: false,
      writable: false
    });
  }
});

// ../../.nvm/versions/node/v20.10.0/lib/node_modules/winglang/node_modules/constructs/lib/metadata.js
var require_metadata = __commonJS({
  "../../.nvm/versions/node/v20.10.0/lib/node_modules/winglang/node_modules/constructs/lib/metadata.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// ../../.nvm/versions/node/v20.10.0/lib/node_modules/winglang/node_modules/constructs/lib/index.js
var require_lib = __commonJS({
  "../../.nvm/versions/node/v20.10.0/lib/node_modules/winglang/node_modules/constructs/lib/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_construct(), exports2);
    __exportStar(require_metadata(), exports2);
    __exportStar(require_dependency(), exports2);
  }
});

// ../../.nvm/versions/node/v20.10.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/core/connections.js
var require_connections = __commonJS({
  "../../.nvm/versions/node/v20.10.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/core/connections.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Connections = exports2.CONNECTIONS_FILE_PATH = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var fs = __importStar(require("fs"));
    var path = __importStar(require("path"));
    var CONNECTIONS_SYMBOL = Symbol.for("@winglang/sdk.core.Connections");
    exports2.CONNECTIONS_FILE_PATH = "connections.json";
    var Connections = class _Connections {
      static {
        __name(this, "Connections");
      }
      /**
       * Return the matching Connections of the given construct tree.
       */
      static of(construct) {
        let connections = construct.node.root[CONNECTIONS_SYMBOL];
        if (!connections) {
          connections = new _Connections();
          construct.node.root[CONNECTIONS_SYMBOL] = connections;
        }
        return connections;
      }
      constructor() {
        this._connections = [];
      }
      /**
       * Adds a connection between two constructs. A connection is a piece of
       * metadata describing how one construct is related to another construct.
       */
      add(props) {
        const connection = {
          source: props.source,
          target: props.target,
          name: props.name
        };
        if (this._connections.some((c) => c.source === connection.source && c.target === connection.target && c.name === connection.name)) {
          return;
        }
        this._connections.push(connection);
      }
      /**
       * Synthesize `connections.json` to the given directory.
       */
      synth(outdir) {
        const connections = this._connections.map((c) => ({
          source: c.source.node.path,
          target: c.target.node.path,
          name: c.name
        }));
        const tree = {
          version: "connections-0.1",
          connections
        };
        fs.writeFileSync(path.join(outdir, exports2.CONNECTIONS_FILE_PATH), JSON.stringify(tree, void 0, 2), { encoding: "utf8" });
      }
    };
    exports2.Connections = Connections;
    _a = JSII_RTTI_SYMBOL_1;
    Connections[_a] = { fqn: "@winglang/sdk.core.Connections", version: "0.0.0" };
  }
});

// ../../.nvm/versions/node/v20.10.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/node.js
var require_node = __commonJS({
  "../../.nvm/versions/node/v20.10.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/node.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Node = exports2.SDK_SOURCE_MODULE = exports2.CONNECTIONS_FILE_PATH = exports2.APP_SYMBOL = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var constructs_1 = require_lib();
    var connections_1 = require_connections();
    var NODE_SYMBOL = Symbol.for("@winglang/sdk.std.Node");
    exports2.APP_SYMBOL = Symbol.for("@winglang/sdk.std.Node/app");
    var ROOT_SYMBOL = Symbol.for("@winglang/sdk.std.Node/root");
    exports2.CONNECTIONS_FILE_PATH = "connections.json";
    exports2.SDK_SOURCE_MODULE = "@winglang/sdk";
    var Node = class _Node {
      static {
        __name(this, "Node");
      }
      /**
       * Marks a type as the root of the tree.
       * @param rootConstructor
       * @internal
       */
      static _markRoot(rootConstructor) {
        rootConstructor[ROOT_SYMBOL] = true;
      }
      /**
       * Return the internal construct node.
       */
      static of(construct) {
        let node = construct[NODE_SYMBOL];
        if (!node) {
          node = new _Node(construct);
          construct[NODE_SYMBOL] = node;
        }
        return node;
      }
      constructor(construct) {
        this.construct = construct;
        this._constructsNode = construct.node;
        this._connections = connections_1.Connections.of(construct);
      }
      /**
       * Adds a connection between two constructs. A connection is a piece of
       * metadata describing how one construct is related to another construct.
       */
      addConnection(props) {
        this._connections.add(props);
      }
      // ---- constructs 10.x APIs ----
      // https://github.com/aws/constructs/blob/10.x/src/construct.ts
      /**
       * Returns the scope in which this construct is defined.
       *
       * The value is `undefined` at the root of the construct scope tree.
       */
      get scope() {
        return this._constructsNode.scope;
      }
      /**
       * The id of this construct within the current scope.
       *
       * This is a a scope-unique id. To obtain an app-unique id for this construct, use `addr`.
       */
      get id() {
        return this._constructsNode.id;
      }
      /**
       * The full, absolute path of this construct in the tree.
       *
       * Components are separated by '/'.
       */
      get path() {
        return this._constructsNode.path;
      }
      /**
       * Returns an opaque tree-unique address for this construct.
       *
       * Addresses are 42 characters hexadecimal strings. They begin with "c8"
       * followed by 40 lowercase hexadecimal characters (0-9a-f).
       *
       * Addresses are calculated using a SHA-1 of the components of the construct
       * path.
       *
       * To enable refactorings of construct trees, constructs with the ID `Default`
       * will be excluded from the calculation. In those cases constructs in the
       * same tree may have the same addreess.
       *
       * @example c83a2846e506bcc5f10682b564084bca2d275709ee
       */
      get addr() {
        return this._constructsNode.addr;
      }
      /**
       * Return a direct child by id, or undefined
       *
       * @param id Identifier of direct child
       * @returns the child if found, or undefined
       */
      tryFindChild(id) {
        return this._constructsNode.tryFindChild(id);
      }
      /**
       * Return a direct child by id
       *
       * Throws an error if the child is not found.
       *
       * @param id Identifier of direct child
       * @returns Child with the given id.
       */
      findChild(id) {
        return this._constructsNode.findChild(id);
      }
      /**
       * Returns the child construct that has the id `Default` or `Resource"`.
       * This is usually the construct that provides the bulk of the underlying functionality.
       * Useful for modifications of the underlying construct that are not available at the higher levels.
       *
       * @throws if there is more than one child
       * @returns a construct or undefined if there is no default child
       */
      get defaultChild() {
        return this._constructsNode.defaultChild;
      }
      /**
       * Override the defaultChild property.
       *
       * This should only be used in the cases where the correct
       * default child is not named 'Resource' or 'Default' as it
       * should be.
       *
       * If you set this to undefined, the default behavior of finding
       * the child named 'Resource' or 'Default' will be used.
       */
      set defaultChild(value) {
        this._constructsNode.defaultChild = value;
      }
      /**
       * All direct children of this construct.
       */
      get children() {
        return this._constructsNode.children;
      }
      /**
       * Return this construct and all of its children in the given order
       */
      findAll(order = constructs_1.ConstructOrder.PREORDER) {
        return this._constructsNode.findAll(order);
      }
      /**
       * This can be used to set contextual values.
       * Context must be set before any children are added, since children may consult context info during construction.
       * If the key already exists, it will be overridden.
       * @param key The context key
       * @param value The context value
       */
      setContext(key, value) {
        this._constructsNode.setContext(key, value);
      }
      /**
       * Retrieves a value from tree context if present. Otherwise, would throw an error.
       *
       * Context is usually initialized at the root, but can be overridden at any point in the tree.
       *
       * @param key The context key
       * @returns The context value or throws error if there is no context value for this key
       */
      getContext(key) {
        return this._constructsNode.getContext(key);
      }
      /**
       * Retrieves a value from tree context.
       *
       * Context is usually initialized at the root, but can be overridden at any point in the tree.
       *
       * @param key The context key
       * @returns The context value or `undefined` if there is no context value for this key.
       */
      tryGetContext(key) {
        return this._constructsNode.tryGetContext(key);
      }
      /**
       * An immutable array of metadata objects associated with this construct.
       * This can be used, for example, to implement support for deprecation notices, source mapping, etc.
       */
      get metadata() {
        return this._constructsNode.metadata;
      }
      /**
       * Adds a metadata entry to this construct.
       * Entries are arbitrary values and will also include a stack trace to allow tracing back to
       * the code location for when the entry was added. It can be used, for example, to include source
       * mapping in CloudFormation templates to improve diagnostics.
       *
       * @param type a string denoting the type of metadata
       * @param data the value of the metadata (can be a Token). If null/undefined, metadata will not be added.
       * @param options options
       */
      addMetadata(type, data, options = {}) {
        this._constructsNode.addMetadata(type, data, options);
      }
      /**
       * All parent scopes of this construct.
       *
       * @returns a list of parent scopes. The last element in the list will always
       * be the current construct and the first element will be the root of the
       * tree.
       */
      get scopes() {
        return this._constructsNode.scopes;
      }
      /**
       * Returns the root of the construct tree (the `cloud.App` object).
       *
       * Similar to `app`.
       *
       * @returns The root of the construct tree.
       */
      get root() {
        if (!this._root) {
          this._root = this.findRoot(this.construct);
        }
        return this._root;
      }
      /**
       * Returns the root of the construct tree (the `cloud.App` object).
       *
       * Similar to `root`.
       *
       * @returns The root of the construct tree.
       */
      get app() {
        if (!this._app) {
          this._app = this.findApp(this.construct);
        }
        return this._app;
      }
      /**
       * Returns true if this construct or the scopes in which it is defined are
       * locked.
       */
      get locked() {
        return this._constructsNode.locked;
      }
      /**
       * Add an ordering dependency on another construct.
       *
       * An `IDependable`
       */
      addDependency(...deps) {
        this._constructsNode.addDependency(...deps);
      }
      /**
       * Return all dependencies registered on this node (non-recursive).
       */
      get dependencies() {
        return this._constructsNode.dependencies;
      }
      /**
       * Remove the child with the given name, if present.
       *
       * @returns Whether a child with the given name was deleted.
       * @experimental
       */
      tryRemoveChild(childName) {
        return this._constructsNode.tryRemoveChild(childName);
      }
      /**
       * Adds a validation to this construct.
       *
       * When `node.validate()` is called, the `validate()` method will be called on
       * all validations and all errors will be returned.
       *
       * @param validation The validation object
       */
      addValidation(validation) {
        this._constructsNode.addValidation(validation);
      }
      /**
       * Validates this construct.
       *
       * Invokes the `validate()` method on all validations added through
       * `addValidation()`.
       *
       * @returns an array of validation error messages associated with this
       * construct.
       */
      validate() {
        return this._constructsNode.validate();
      }
      /**
       * Locks this construct from allowing more children to be added. After this
       * call, no more children can be added to this construct or to any children.
       */
      lock() {
        this._constructsNode.lock();
      }
      /**
       * Returns the root app.
       */
      findApp(scope) {
        if (isApp(scope)) {
          return scope;
        }
        if (!scope.node.scope) {
          throw new Error("Cannot find root app");
        }
        return this.findApp(scope.node.scope);
      }
      findRoot(scope) {
        if (isRoot(scope)) {
          return scope;
        }
        if (!scope.node.scope) {
          throw new Error("Cannot find root construct");
        }
        return this.findRoot(scope.node.scope);
      }
    };
    exports2.Node = Node;
    _a = JSII_RTTI_SYMBOL_1;
    Node[_a] = { fqn: "@winglang/sdk.std.Node", version: "0.0.0" };
    function isApp(x) {
      return x && x[exports2.APP_SYMBOL];
    }
    __name(isApp, "isApp");
    function isRoot(x) {
      return x && x.constructor && x.constructor[ROOT_SYMBOL];
    }
    __name(isRoot, "isRoot");
  }
});

// ../../.nvm/versions/node/v20.10.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/helpers.js
var require_helpers = __commonJS({
  "../../.nvm/versions/node/v20.10.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/helpers.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.unwrap = exports2.normalPath = exports2.nodeof = exports2.range = exports2.assert = exports2.neq = exports2.eq = void 0;
    var node_assert_1 = require("node:assert");
    var node_1 = require_node();
    function eq(a, b) {
      try {
        (0, node_assert_1.deepStrictEqual)(a, b);
        return true;
      } catch {
        return false;
      }
    }
    __name(eq, "eq");
    exports2.eq = eq;
    function neq(a, b) {
      try {
        (0, node_assert_1.notDeepStrictEqual)(a, b);
        return true;
      } catch {
        return false;
      }
    }
    __name(neq, "neq");
    exports2.neq = neq;
    function assert(condition, message) {
      if (!condition) {
        throw new Error("assertion failed: " + message);
      }
    }
    __name(assert, "assert");
    exports2.assert = assert;
    function range(start, end, inclusive) {
      function* iterator() {
        let i = start;
        let limit = inclusive ? end < start ? end - 1 : end + 1 : end;
        while (i < limit)
          yield i++;
        while (i > limit)
          yield i--;
      }
      __name(iterator, "iterator");
      return iterator();
    }
    __name(range, "range");
    exports2.range = range;
    function nodeof(construct) {
      return node_1.Node.of(construct);
    }
    __name(nodeof, "nodeof");
    exports2.nodeof = nodeof;
    function normalPath(path) {
      return path.replace(/\\+/g, "/");
    }
    __name(normalPath, "normalPath");
    exports2.normalPath = normalPath;
    function unwrap(value) {
      if (value != null) {
        return value;
      }
      throw new Error("Unexpected nil");
    }
    __name(unwrap, "unwrap");
    exports2.unwrap = unwrap;
  }
});

// target/main.tfaws/.wing/inflight.$Closure1-1.js
var require_inflight_Closure1_1 = __commonJS({
  "target/main.tfaws/.wing/inflight.$Closure1-1.js"(exports2, module2) {
    "use strict";
    var $helpers = require_helpers();
    module2.exports = function({}) {
      class $Closure1 {
        static {
          __name(this, "$Closure1");
        }
        constructor({}) {
          const $obj = /* @__PURE__ */ __name((...args) => this.handle(...args), "$obj");
          Object.setPrototypeOf($obj, this);
          return $obj;
        }
        async handle(name) {
          console.log(String.raw({ raw: ["Received name: ", ""] }, name));
          const greeting = String.raw({ raw: ["Hello, ", ""] }, name);
          console.log(String.raw({ raw: ["returned: ", ""] }, greeting));
          return greeting;
        }
      }
      return $Closure1;
    };
  }
});

// target/main.tfaws/.wing/cloud.function_c8d2eca1.js
var $handler = void 0;
exports.handler = async function(event) {
  $handler = $handler ?? await (async () => {
    const $Closure1Client = require_inflight_Closure1_1()({});
    const client = new $Closure1Client({});
    if (client.$inflight_init) {
      await client.$inflight_init();
    }
    return client;
  })();
  return await $handler.handle(event === null ? void 0 : event);
};
//# sourceMappingURL=index.js.map
