import cv2
import streamlit as st
from streamlit_extras.metric_cards import style_metric_cards
from ultralytics import YOLO
from PIL import Image

style_metric_cards(
    background_color="#262730",
    border_left_color=None,
    border_color=None,
    box_shadow=False,
)


@st.cache_resource
def load_model():
    return YOLO("pcb_defect/v2/weights/best.pt")


def file_uploader_on_change():
    st.session_state["image_updated"] = True


if "image_updated" not in st.session_state:
    st.session_state["image_updated"] = True

model = load_model()

st.title("PCB 瑕疵檢測")
st.divider()

st.header("請上傳 PCB 圖片")
uploaded_file = st.file_uploader("", type=["jpg", "jpeg", "png"], on_change=file_uploader_on_change)
st.divider()

# Predict only when image is uploaded.
if uploaded_file is not None and st.session_state["image_updated"]:
    image = Image.open(uploaded_file)
    results = model.predict(image)
    annotated_frame = results[0].plot()
    label_count = results[0].to_df().value_counts("name")
    st.session_state["image"] = image
    st.session_state["annotated_frame"] = annotated_frame
    st.session_state["label_count"] = label_count
    st.session_state["image_updated"] = False

# Display the results.
if uploaded_file is not None:
    st.subheader("瑕疵數量統計")
    cols = st.columns(3)
    label_count = st.session_state["label_count"]
    for i, name in enumerate(model.names.values()):
        with cols[i % 3]:
            st.metric(label=name, value=label_count.get(name, 0))
        if (i + 1) % 3 == 0 and i + 1 < len(model.names):
            cols = st.columns(3)
    st.divider()

    st.subheader("瑕疵點位")
    image_switch = st.checkbox("顯示原始圖片")
    if image_switch:
        image = st.session_state["image"]
        st.image(image)
    else:
        annotated_frame = st.session_state["annotated_frame"]
        st.image(annotated_frame)
    st.divider()
