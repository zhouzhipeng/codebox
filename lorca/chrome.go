package lorca

import (
	"encoding/json"
	"os/exec"
	"sync"
)

// Result is a struct for the resulting value of the JS expression or an error.
type result struct {
	Value json.RawMessage
	Err   error
}

type bindingFunc func(args []json.RawMessage) (interface{}, error)

type chrome struct {
	sync.Mutex
	cmd      *exec.Cmd
	id       int32
	target   string
	session  string
	window   int
	pending  map[int]chan result
	bindings map[string]bindingFunc
}

func newChromeWithArgs(chromeBinary string, args ...string) (*chrome, error) {
	// The first two IDs are used internally during the initialization
	c := &chrome{
		id:       2,
		pending:  map[int]chan result{},
		bindings: map[string]bindingFunc{},
	}

	// Start chrome process
	c.cmd = exec.Command(chromeBinary, args...)
	_, err := c.cmd.StderrPipe()
	if err != nil {
		return nil, err
	}
	if err := c.cmd.Start(); err != nil {
		return nil, err
	}

	return c, nil
}

func (c *chrome) kill() error {

	// TODO: cancel all pending requests
	if state := c.cmd.ProcessState; state == nil || !state.Exited() {
		return c.cmd.Process.Kill()
	}
	return nil
}
