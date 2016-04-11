"use strict";
const React = require('react');
class UEditor extends React.Component {
    componentDidMount() {
        this.load(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.load(nextProps);
    }
    load(props) {
        var editor = UE.getEditor(props.id, {
            toolbars: [[
                    'fullscreen', 'source', '|', 'undo', 'redo', '|',
                    'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch',
                    '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                    'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                    'directionalityltr', 'directionalityrtl', 'indent', '|',
                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                    'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                    'simpleupload',
                    'horizontal', 'date', 'time',
                ]],
            lang: "zh-cn",
            'fontfamily': [
                { label: '', name: 'songti', val: '宋体,SimSun' },
                { label: '', name: 'kaiti', val: '楷体,楷体_GB2312, SimKai' },
                { label: '', name: 'yahei', val: '微软雅黑,Microsoft YaHei' },
                { label: '', name: 'heiti', val: '黑体, SimHei' },
                { label: '', name: 'lishu', val: '隶书, SimLi' },
                { label: '', name: 'andaleMono', val: 'andale mono' },
                { label: '', name: 'arial', val: 'arial, helvetica,sans-serif' },
                { label: '', name: 'arialBlack', val: 'arial black,avant garde' },
                { label: '', name: 'comicSansMs', val: 'comic sans ms' },
                { label: '', name: 'impact', val: 'impact,chicago' },
                { label: '', name: 'timesNewRoman', val: 'times new roman' }
            ],
            'fontsize': [10, 11, 12, 14, 16, 18, 20, 24, 36],
            enableAutoSave: false,
            autoHeightEnabled: false,
            initialFrameHeight: props.height,
            initialFrameWidth: '95%',
            height: props.height
        });
        editor.ready((ueditor) => {
            var value = props.value ? props.value : '<p></p>';
            editor.setContent(value);
        });
    }
    render() {
        return (React.createElement("script", {id: this.props.id, name: this.props.id, type: "text/plain"}));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UEditor;
//# sourceMappingURL=index.js.map