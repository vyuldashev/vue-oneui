import hljs from 'highlight.js/lib/highlight';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';

const vueHighlightJS = {
    install(Vue) {
        hljs.registerLanguage('xml', xml);
        hljs.registerLanguage('json', json);

        Vue.directive('highlightjs', {
            deep: true,
            bind: function bind(el, binding) {
                // on first bind, highlight all targets
                const targets = el.querySelectorAll('code');
                let target;

                for (let i = 0; i < targets.length; i += 1) {
                    target = targets[i];

                    if (typeof binding.value === 'string') {
                        // if a value is directly assigned to the directive, use this
                        // instead of the element content.
                        target.textContent = binding.value;
                    }

                    hljs.highlightBlock(target);
                }
            },
            componentUpdated: function componentUpdated(el, binding) {
                // after an update, re-fill the content and then highlight
                const targets = el.querySelectorAll('code');
                let target;

                for (let i = 0; i < targets.length; i += 1) {
                    target = targets[i];
                    if (typeof binding.value === 'string') {
                        target.textContent = binding.value;
                        hljs.highlightBlock(target);
                    }
                }
            },
        });
    }
};

export default vueHighlightJS;
