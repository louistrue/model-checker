import ifcopenshell
import re
import os
from ifcopenshell.util.schema import get_fallback_schema

def open_with_fallback(path):
    schema_id = None
    with open(path, 'r', encoding='utf-8', errors='ignore') as fh:
        header = fh.read(1024)
        m = re.search(r"FILE_SCHEMA\(\('(.*?)'\)\)", header, re.IGNORECASE)
        if m:
            schema_id = m.group(1)
    try:
        return ifcopenshell.open(path)
    except Exception:
        if schema_id:
            fallback = get_fallback_schema(schema_id)
            if fallback != schema_id:
                content = open(path, 'r', encoding='utf-8', errors='ignore').read()
                content = re.sub(r"FILE_SCHEMA\(\('(.*?)'\)\)", f"FILE_SCHEMA(('"+fallback+"'))", content)
                return ifcopenshell.file.from_string(content)
        raise

def create_test_file(path):
    model = ifcopenshell.file(schema='IFC4X3_ADD2')
    model.createIfcProject('1')
    tmp = path + '.orig'
    model.write(tmp)
    txt = open(tmp).read().replace('IFC4X3_ADD2', 'IFC4X3_RC1')
    with open(path, 'w') as f:
        f.write(txt)
    os.remove(tmp)

if __name__ == '__main__':
    test_path = 'tmp_test_ifc.ifc'
    create_test_file(test_path)
    try:
        model = open_with_fallback(test_path)
        assert model.schema.upper().startswith('IFC4X3')
        print('OK')
    finally:
        if os.path.exists(test_path):
            os.remove(test_path)
