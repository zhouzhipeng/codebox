#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

use image::ImageFormat;
use wry::application::dpi::{LogicalSize, Size};
use wry::application::window::Icon;

fn main() -> wry::Result<()> {
    use wry::{
        application::{
            event::{Event, StartCause, WindowEvent},
            event_loop::{ControlFlow, EventLoop},
            window::WindowBuilder,
        },
        webview::WebViewBuilder,
    };


    //icon
    let bytes: Vec<u8> = include_bytes!("icon.png").to_vec();
    let imagebuffer = image::load_from_memory_with_format(&bytes, ImageFormat::Png).unwrap().into_rgba8();
    let (icon_width, icon_height) = imagebuffer.dimensions();
    let icon_rgba = imagebuffer.into_raw();

    let icon = Icon::from_rgba(icon_rgba, icon_width, icon_height).unwrap();

    let event_loop = EventLoop::new();
    let window = WindowBuilder::new()
        .with_title("Codebox")
        .with_inner_size(LogicalSize::new(1000, 600))
        .with_window_icon(Some(icon.clone()))
//         .with_taskbar_icon(Some(icon))
        .build(&event_loop)?;
    let _webview = WebViewBuilder::new(window)?
        .with_url("http://127.0.0.1")?
        .build()?;

    event_loop.run(move |event, _, control_flow| {
        *control_flow = ControlFlow::Wait;

        match event {
            Event::NewEvents(StartCause::Init) => println!("Wry has started!"),
            Event::WindowEvent {
                event: WindowEvent::CloseRequested,
                ..
            } => {
                println!("window close");
                *control_flow = ControlFlow::Exit
            },
            _ => (),
        }
    });
}